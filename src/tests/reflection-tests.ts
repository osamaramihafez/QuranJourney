import { apiGET, apiPOST, apiPATCH, apiDELETE } from "./request";
import { seedData } from "../services/postgres/seed";
import { Errors } from "../utils/constants";
import { Reflection } from "../models/reflection/reflection";

export function reflectionTests() {
    it("getting reflection's information", async () => {
        let ReflectionA: Reflection = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1`);
        let ReflectionB: Reflection = resp1.data.data[0];
        checkReflectionMatch(ReflectionA, ReflectionB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting reflection's information by surah id and verse id", async () => {
        let ReflectionA: Reflection = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1/1`);
        let reflectionB: Reflection = resp1.data.data[0];
        expect(ReflectionA.title).toEqual(reflectionB.title);
        expect(ReflectionA.reflection).toEqual(reflectionB.reflection);
        expect(ReflectionA.reflectionId).toEqual(reflectionB.reflectionId);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a reflection", async () => {
        let newreflection: Reflection = {
            verseId: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
            reflectionId: 0, // assuming reflectionId is auto-incremented
        };

        let resp1 = await apiPOST(`/reflection`, newreflection);
        let reflection: Reflection = resp1.data.data[0];
        checkReflectionMatch(newreflection, reflection);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a reflection", async () => {
        let newreflection: Reflection = {
            reflectionId: 1,
            verseId: 1,
            title: "Alhamdulillah",
            reflection: "My Last Reflection",
        };

        let resp1 = await apiGET(`/reflection/1`);
        let original_reflection: Reflection = resp1.data.data[0];
        expect(original_reflection.title).not.toEqual(newreflection.title);
        expect(original_reflection.reflection).not.toEqual(
            newreflection.reflection
        );

        await apiPATCH(`/reflection`, newreflection);
        let resp2 = await apiGET(`/reflection/1`);
        checkReflectionMatch(newreflection, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    it("delete a reflection", async () => {
        let resp = await apiGET(`/reflection/1`);
        let resp1 = await apiDELETE(`/reflection/1`);
        // We want to ensure that the deleted lesson is the correct lesson.
        expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
        expect(resp1.data.success).toEqual(true);
        let resp2 = await apiGET(`/reflection/1`);
        expect(resp2.data.code).toEqual(Errors.DB_DNE);
        expect(resp2.data.success).toEqual(false);
    });
}

export function checkReflectionMatch(
    reflectionA: Reflection,
    reflectionB: Reflection
) {
    expect(reflectionA.title).toEqual(reflectionB.title);
    expect(reflectionA.reflection).toEqual(reflectionB.reflection);
    expect(reflectionA.verseId).toEqual(reflectionB.verseId);
}
