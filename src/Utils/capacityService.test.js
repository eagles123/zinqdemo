import { getCapacity } from "./fakeCapacityService";

describe("borrowing capacity caculator", () => {
  it("should return 566607 with this input", () => {
    const result = getCapacity(
      "Joint",
      3,
      "Main Residence",
      175000,
      26000,
      45000,
      35000,
      4000,
      3500,
      10000,
      2000,
      15000
    );
    expect(result).toBe(566607);
  });
  it("should return 182075 with this input", () => {
    const result = getCapacity(
      "Single",
      0,
      "Investment Property",
      75000,
      6000,
      0,
      0,
      1000,
      0,
      0,
      2000,
      5000
    );
    expect(result).toBe(182075);
  });
});
