# Use swagger-inline to generate OAS 2.0 file
npx swagger-inline "../model/**/**.js" "../routes/**/**.js" --base oasBase.json --format .json > temp.json
# Use Python script to format OAS file
python3 formatOAS.py temp.json
# Use Redoc CLI to convert the OAS file to HTML
redoc-cli build oas.json -t doc.hbs --options.theme.colors.primary.main=brown
# Output the HTML to a file
mv redoc-static.html index.html
# Clean up the temporary files
rm temp.json
rm oas.json

# npx swagger-inline "../model/**/**.js" "../routes/**/**.js" --base oasBase.json --format .json > temp.json
# python3 formatOAS.py temp.json
# rm temp.json
# redoc-cli bundle oas.json -t doc.hbs --options.theme.colors.primary.main=brown
# mv redoc-static.html index.html