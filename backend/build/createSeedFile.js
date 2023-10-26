const fs = require("fs");
const csv = require("csv-parser");

// empty the data.sql file
fs.writeFileSync("database-seed.sql", "", { flag: "w" });

const tablesSql = fs.readFileSync("build/tables.sql", "utf8");
fs.writeFileSync("database-seed.sql", tablesSql + "\n\n", { flag: "a" });

const results = [];

fs.createReadStream("build/beers.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    let sql =
      "INSERT INTO beers(number, abv, ibu, id, name, style, brewery_id, ounces) VALUES\n";
    results.forEach((row, index) => {
      sql += `(${row.number}, ${row.abv ? row.abv : "NULL"}, ${
        row.ibu ? row.ibu : "NULL"
      }, ${row.id}, '${row.name.replace(/'/g, "''")}', '${row.style.replace(
        /'/g,
        "''"
      )}', ${row.brewery_id}, ${row.ounces})`;
      if (index < results.length - 1) {
        sql += ",\n";
      }
    });
    sql += ";";
    fs.writeFileSync("database-seed.sql", sql, { flag: "a" }); // append to the file
  });

const results2 = [];

fs.createReadStream("build/breweries.csv")
  .pipe(csv())
  .on("data", (data) => results2.push(data))
  .on("end", () => {
    let sql = "INSERT INTO breweries(id, name, city, state) VALUES\n";
    results2.forEach((row, index) => {
      sql += `(${row.id}, '${row.name.replace(
        /'/g,
        "''"
      )}', '${row.city.replace(/'/g, "''")}', '${row.state.replace(
        /^\s+/,
        ""
      )}')`;
      if (index < results2.length - 1) {
        sql += ",\n";
      }
    });
    sql += ";\n\n";
    fs.writeFileSync("database-seed.sql", sql, { flag: "a" }); // append to the file
  });
