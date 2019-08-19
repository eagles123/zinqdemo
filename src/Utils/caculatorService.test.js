import { frequecyConverter, monthlyRepay } from "./fakeCaculatorService";

describe("repayment caculator frequency converter", () => {
  it("should return 52.17857 when input Weekly", () => {
    const result = frequecyConverter("Weekly");
    expect(result).toBe(52.17857);
  });

  it("should return 26.08929 when input Fortnightly", () => {
    const result = frequecyConverter("Fortnightly");
    expect(result).toBe(26.08929);
  });

  it("should return 12 when input Monthly", () => {
    const result = frequecyConverter("Monthly");
    expect(result).toBe(12);
  });

  it("should return 4 when input Quarterly", () => {
    const result = frequecyConverter("Quarterly");
    expect(result).toBe(4);
  });
  it("should return 2 when input HalfYearly", () => {
    const result = frequecyConverter("HalfYearly");
    expect(result).toBe(2);
  });
  it("should return 1 when input Yearly", () => {
    const result = frequecyConverter("Yearly");
    expect(result).toBe(1);
  });
});

describe("monthly repayment amount", () => {});
