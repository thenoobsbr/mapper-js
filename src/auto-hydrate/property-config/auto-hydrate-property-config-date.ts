import {AutoHydratePropertyConfig} from "./auto-hydrate-property-config";

export class AutoHydratePropertyConfigDate extends AutoHydratePropertyConfig {
    execute(value: unknown, input: object) {
        if (value instanceof Date) {
            return value;
        }
        if (typeof value === "string") {
            return new Date(value);
        }
        throw new Error("Invalid date");
    }
}