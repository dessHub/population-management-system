import { getLocationByName, validateBody, validateInteger } from './index';

describe("Test helper functions", () => {

  test("validate that location name is required when creating a location", () => {
    const body = {
      "males": "10",
      "females": "20"
    };
    expect(validateBody(body).name).toBe("error, name is required");
  })

  test("validate that females is required when creating a location", () => {
    const body = {
      "males": "10",
      "name": "testname"
    };
    expect(validateBody(body).females).toBe("error, females is required");
  })

  test("validate that males is required when creating a location", () => {
    const body = {
      "name": "testname",
      "females": "20"
    };
    expect(validateBody(body).males).toBe("error, males is required");
  })

})
