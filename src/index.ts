type ListWithNullable<T extends unknown[]> = { [key in keyof T]: T[key] | undefined | null }

export function run<T extends unknown[], U>(runnable: (...args: T) => U) {
    return {
        wif: (...args: ListWithNullable<T>) => {
            const ifCase = args.every(arg => arg !== null && arg != undefined);
            return Object.assign(() => {
                if (ifCase) {
                    return runnable(...args as T)
                }
            }, {
                else<S>(alsoRunnable: () => S) {
                    if (ifCase) {
                        return runnable(...args as T)
                    }
                    return alsoRunnable();
                }
            });
        }
    }
}