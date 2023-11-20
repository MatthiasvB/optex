import { run } from ".."

describe("optex' wif function", () => {
    it("returns a function", () => {
        expect(typeof run((x: number) => {}).wif(0)).toBe("function");
    });

    it("executes a callback and returns its result if the argument is not null or undefined", () => {
        expect(run((x: number) => x).wif(0)()).toBe(0);
    });

    it("executes a callback and returns its result if none of the arguments is null or undefined", () => {
        expect(run((x: number, y: string, z: boolean) => x + y + z).wif(0, 'ho', false)()).toBe("0hofalse");
    });

    it("does nothing if any argument is nullish", () => {
        const spy = jest.fn((x: number, y: string, z: boolean) => x + y + z);
        run(spy).wif(0, null, false)();
        expect(spy).toHaveBeenCalledTimes(0);

        run(spy).wif(0, "hu", undefined)();
        expect(spy).toHaveBeenCalledTimes(0);

        run(spy).wif(0, "hu", true)();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("can be extended with an else clause", () => {
        expect(run((x: number) => x).wif(0).else(() => 1)).toBe(0);
        expect(run((x: number) => x).wif(undefined).else(() => 1)).toBe(1);
    });
})