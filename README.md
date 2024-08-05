# Sudoku App

このプロジェクトは、数独ゲームを実装したウェブアプリケーションです。

## プロジェクトのセットアップ

まず、リポジトリをクローンし、依存関係をインストールします。

```bash
git clone https://github.com/your-username/sudoku-app.git
cd sudoku-app
pnpm install
```

次に、開発サーバーを起動します。

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて、結果を確認します。

`src/app/_component/SudokuInit.tsx` を編集することでページの編集を開始できます。ファイルを編集するとページが自動的に更新されます。


## 詳細情報

このプロジェクトについて詳しく知りたい場合は、以下のリソースを参照してください。

- [Next.js Documentation](https://nextjs.org/docs) - Next.jsの機能とAPIについて学びます。
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル。
- [Mantine](https://mantine.dev/) - Mantine UI Library

## Vercelへのデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの作成者が提供する [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

詳細については、[Next.js deployment documentation](https://nextjs.org/docs/deployment) を参照してください。





参考
- https://supabase.com/docs/reference/javascript/select
- https://qiita.com/kabochapo/items/26b1bb753116a6904664
- https://qiita.com/ryuta_yoshida/items/c57547b1a0d57427c858


```
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://**********.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

```
CREATE OR REPLACE FUNCTION get_aggregates(key_value TEXT)
RETURNS TABLE (
  total_count INTEGER,
  average_value NUMERIC,
  max_value NUMERIC,
  min_value NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) AS total_count,
    AVG(your_column) AS average_value,
    MAX(your_column) AS max_value,
    MIN(your_column) AS min_value
  FROM
    your_table
  WHERE
    some_key = key_value;
END;
$$ LANGUAGE plpgsql;
```

