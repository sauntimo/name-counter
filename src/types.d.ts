interface ISmbh {
	push: (chunk: string | Buffer, pos?: number) =>  void;
	matches: number;
}

declare module "streamsearch" {
	interface SMBHCtor {
		new (needle: string | Buffer): ISmbh;
	}
	const SMBH: SMBHCtor;
	export = SMBH;
}
