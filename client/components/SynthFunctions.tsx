import { Synth } from 'tone'

export const playNote = (
  synth: Synth | null,
  note: string,
  duration = '10n'
) => {
  if (synth) {
    synth.triggerAttackRelease(note, duration)
  }
}




