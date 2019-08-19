import { upFront, trailing } from "./fakeCashBackService";

describe("cashback upfront", () => {
  it("should return 4682 if imput is 1000000", () => {
    const result = upFront(1000000);
    expect(result).toBe(4682);
  });

  it("should throw if amount less than 250000", () => {
    expect(() => {
      upFront(100);
    }).toThrow("minimum amount is 250000");
  });

  it("should throw if input not a number", () => {
    expect(() => {
      trailing("100");
    }).toThrow("not a number");
  });
});

describe("cashback trailing", () => {
  it("should return 33097 if input is 1000000", () => {
    const result = trailing(1000000);
    expect(result).toBe(33098);
  });

  it("should throw if amount less than 250000", () => {
    expect(() => {
      trailing(100);
    }).toThrow("minimum amount is 250000");
  });

  it("should throw if input not a number", () => {
    expect(() => {
      trailing("xxx");
    }).toThrow("not a number");
  });
});
