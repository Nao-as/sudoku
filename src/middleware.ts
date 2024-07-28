import { type NextRequest, NextResponse } from "next/server";

// ミドルウェアの設定
export const config = {
	matcher: ["/:path*"], // すべてのパスに対してミドルウェアを適用
};

// ミドルウェア関数
export function middleware(request: NextRequest) {
	NextResponse.next();

	// 環境変数がproductionでない場合、進行する
	if (process.env.NODE_ENV !== "production") return NextResponse.next();

	const authorizationHeader = request.headers.get("authorization"); // Authorizationヘッダーを取得

	// Authorizationヘッダーが存在しない場合、認証失敗レスポンスを返す
	if (!authorizationHeader) return unauthorizedResponse();

	const [type, credentials] = authorizationHeader.split(" "); // ヘッダーを分割して認証タイプと資格情報を取得

	// 認証タイプがBasicでない、または資格情報が存在しない場合、認証失敗レスポンスを返す
	if (type !== "Basic" || !credentials) return unauthorizedResponse();

	const [username, password] = atob(credentials).split(":"); // 資格情報をデコードしてユーザー名とパスワードを取得

	// ユーザー名とパスワードが環境変数と一致する場合、次のレスポンスを返す
	if (
		username === process.env.BASIC_AUTH_USER &&
		password === process.env.BASIC_AUTH_PASSWORD
	) {
		return NextResponse.next();
	}

	// 認証失敗レスポンスを返す
	return unauthorizedResponse();
}

// 認証失敗レスポンスを生成する関数
function unauthorizedResponse() {
	const response = new NextResponse("Authentication required", { status: 401 }); // 401ステータスコードでレスポンスを生成
	response.headers.set("WWW-Authenticate", 'Basic realm="Secure Area"'); // WWW-Authenticateヘッダーを設定
	return response;
}
