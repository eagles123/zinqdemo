import { caculateQuote } from "./fakeInsuranceService";

describe("get insurnace quote", () => {
  it("should return right value", () => {
    const result = caculateQuote(
      120000,
      5,
      1150000,
      1200000,
      44.1889117043121,
      3,
      "No",
      "Yes"
    );
    expect(result).toEqual({
      life_cover: 1768968,
      tpd_cover: 1659071,
      trauma_cover: 140000,
      ip_cover: 7500
    });
  });
});
