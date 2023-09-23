import { Synth } from 'tone'

export const playNote = (
  synth: Synth | null,
  note: string,
  duration = '8n'
) => {
  if (synth) {
    synth.triggerAttackRelease(note, duration)
  }
}
