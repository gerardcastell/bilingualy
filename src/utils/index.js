export const firebaseWrapper = async (promise) => {
    let rejected = Symbol();
    let value_or_error = await promise.catch((error) => {
        return { [rejected]: true, error: error };
    });

    if (value_or_error[rejected]) {
        throw value_or_error.error;
    } else {
        return value_or_error;
    }
}