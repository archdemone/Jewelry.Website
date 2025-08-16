export type FlagName = 'USE_CANARY_ROLLOUT'

export function getFlag(name: FlagName): boolean {
	return process.env[name] === 'true'
}

export function useCanary(): boolean {
	return getFlag('USE_CANARY_ROLLOUT')
}