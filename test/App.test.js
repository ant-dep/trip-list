describe("addTrip", () => {
  it("should add a trip to the trip list", () => {
    const app = new App();
    app.addTrip("test", "test");
    expect(app.tripList.length).toEqual(1);
  });
});
