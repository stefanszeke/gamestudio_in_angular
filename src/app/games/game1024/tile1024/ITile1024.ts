export interface ITile1024 {
    value: number;
    hidden: boolean;
    mergeWith(other: ITile1024): boolean;
    isEmpty(): boolean;
}