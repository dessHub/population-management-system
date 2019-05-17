const letterCount = require("./"); 

test("letterCount works with regular strings", () => {
  expect(letterCount("awesome", "e")).toBe(2);
});
