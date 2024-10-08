export type Difficulty = 'easy' | 'normal' | 'hard'

export const clearMessages: Record<Difficulty, string[]> = {
  easy: [
    '素晴らしいですね！簡単だったかもしれませんが、楽しんでくれたなら良かったです (^_^)',
    'お疲れ様！とても上手でしたね。これからも一緒に楽しみましょう (*^-^*)',
    '見事です！簡単なステージでも、しっかりクリアしましたね (^_^)v',
    'お見事！難しくないステージでも、集中力が素晴らしいです (*^^)v',
    'よくやったね！簡単だったけど、楽しかったかな？ (⌒_⌒;)',
  ],
  normal: [
    'お疲れ様！ちょうどいい難易度、頑張りましたね (^_^)ノ',
    'すごい！普通の難易度を難なくクリアできたのは、最高です (^-^)',
    'お疲れ様！この難易度も難なくクリアしましたね、さすがです (o^^o)',
    '見事です！ちょうどいい難易度をクリアして、すっきりしましたね (^.^)',
    'よくできました！普通の難易度も難なくこなして、いい感じです (*^-^)b',
  ],
  hard: [
    'お疲れ様！難しいステージもクリアしましたね。本当に素晴らしいです (≧▽≦)',
    'すごい！ハードなステージをクリアするなんて、まさに腕前ですね (⌒o⌒)',
    'お疲れ様！難易度の高い挑戦もクリアして、完璧でした (*^^*)',
    '見事なクリアです！難しいステージも乗り越えて、素晴らしいですね (≧ω≦)',
    'ちょー最高です！ハードな難易度もクリアしちゃいましたね。尊敬です (^o^)',
  ],
}
