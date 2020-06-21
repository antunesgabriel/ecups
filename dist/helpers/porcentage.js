"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calcPorcentage(initial, end) {
    if (initial === 0) {
        return end * 100;
    }
    return ((end - initial) / initial) * 100;
}
exports.calcPorcentage = calcPorcentage;
//# sourceMappingURL=porcentage.js.map