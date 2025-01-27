function validateFormatting(obj) {
    if (!obj || typeof obj !== "object") return false;

    if (!Array.isArray(obj.users) || typeof obj.users[0] !== "string") {
        return false;
    }

    if (typeof obj.reason !== "string") {
        return false;
    }

    if (
        typeof obj.Day !== "number" || obj.Day < 1 || obj.Day > 7
    ) {
        return false;
    }

    if (
        !Array.isArray(obj.slots) ||
        obj.slots.length !== 7 ||
        obj.slots.some(slot => slot !== 0 && slot !== 1)
    ) {
        return false;
    }

    return true;
}

module.exports = { validateFormatting };