export interface IRmqContextHost {
  readonly context?: {
    readonly args?: [
      {
        readonly correlationId?: string;
      },
    ];
  };
}
