
export class AuthHasJoinDto {
    /**
     * Player UUID
     *
     * @example 070c1fa0bd96485ebbe21cf0d3cbf426
     */
    id: string;

    /**
     * Username
     *
     * @example MrNexon
     */
    name: string;

    /**
     * Array of props
     */
    properties: HasJoinPropItem[]
}

export class HasJoinPropItem {
    name: string;
    /**
     * Base64 JSON
     */
    value: string;
}
