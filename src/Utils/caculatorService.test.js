import {
  frequecyConverter,
  monthlyRepay,
  totalLoan
} from "./fakeCaculatorService";

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

describe("monthly repayment amount with input loan amount 1,000,000, term 30 years interest rate 4.7", () => {
  it("should return 5179 when Weekly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "Weekly");
    expect(result).toBe(5179);
  });

  it("should return 5180 when Fortnightly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "Fortnightly");
    expect(result).toBe(5180);
  });

  it("should return 5186 when Monthly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "Monthly");
    expect(result).toBe(5186);
  });

  it("should return 5196 when Quarterly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "Quarterly");
    expect(result).toBe(5196);
  });

  it("should return 5237 when Yearly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "Yearly");
    expect(result).toBe(5237);
  });

  it("should return 5209 when HalfYearly", () => {
    const result = monthlyRepay(1000000, 4.7, 30, "HalfYearly");
    expect(result).toBe(5209);
  });
});

// describe("Total cost of loan with input loan amount 1,000,000, term 30 years interest rate 4.7", () => {
//   it("should return 4093349 when Weekly", () => {
//     const result = totalLoan(1000000, 4.7, 30, "Weekly");
//     expect(result).toBe(4093349);
//   });
//   it("should return 4090787 when Fortnightly", () => {
//     const result = totalLoan(1000000, 4.7, 30, "Fortnightly");
//     expect(result).toBe(4090787);
//   });
//   it("should return 4093349 when Weekly", () => {
//     const result = totalLoan(1000000, 4.7, 30, "Weekly");
//     expect(result).toBe(4093349);
//   });
//   it("should return 4093349 when Weekly", () => {
//     const result = totalLoan(1000000, 4.7, 30, "Weekly");
//     expect(result).toBe(4093349);
//   });
//   it("should return 4093349 when Weekly", () => {
//     const result = totalLoan(1000000, 4.7, 30, "Weekly");
//     expect(result).toBe(4093349);
//   });
// });
