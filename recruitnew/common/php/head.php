<?php
function ch_device(){

    $ua = $_SERVER['HTTP_USER_AGENT'];

    if ((strpos($ua, 'Android') !== false) && (strpos($ua, 'Mobile') !== false) || (strpos($ua, 'iPhone') !== false) || (strpos($ua, 'Windows Phone') !== false)) {
        // スマホからのアクセス
        $check_device = "mobile";
    } elseif ((strpos($ua, 'Android') !== false) || (strpos($ua, 'iPad') !== false)) {
        // タブレットからのアクセス
        $check_device = "tablet";
    } else {
        // PCからのアクセス
        $check_device = "pc";
    }

    return $check_device;
}
?>
<!DOCTYPE html>
<html lang="ja">

<head prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article#">
	<title><?php echo $title; ?></title>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta charset="UTF-8">
	<meta name="description" content="<?php echo $description; ?>">
	<meta name="viewport" content="width=device-width,user-scalable=no">
	<meta property="og:description" content="<?php echo $description; ?>">
	<meta property="og:title" content="<?php echo $title; ?>">
	<meta property="og:url" content="<?php echo htmlspecialchars ((empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]); ?>">

<?php if(isset($ogimage)){ ?>
<meta property="og:image" content="<?php echo $ogimage; ?>">
<?php }else{ ?>
<meta property="og:image" content="<?php echo (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"]; ?>/common/img/favicons/ogimage.png">
<?php } ?>


	<meta property="og:type" content="website">
	<meta property="og:site_name" content="<?php echo $title; ?>">
	<meta name="twitter:card" content="summary_large_image">

	<link rel="shortcut icon" href="/recruitnew/common/img/favicons/favicon.ico" type="image/vnd.microsoft.icon">
	<link rel="icon" href="/recruitnew/common/img/favicons/favicon.ico" type="image/vnd.microsoft.icon">
	<link rel="apple-touch-icon" sizes="57x57" href="/recruitnew/common/img/favicons/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/recruitnew/common/img/favicons/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/recruitnew/common/img/favicons/apple-touch-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/recruitnew/common/img/favicons/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/recruitnew/common/img/favicons/apple-touch-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/recruitnew/common/img/favicons/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/recruitnew/common/img/favicons/apple-touch-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/recruitnew/common/img/favicons/apple-touch-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/recruitnew/common/img/favicons/apple-touch-icon-180x180.png">
	<link rel="icon" type="image/png" href="/recruitnew/common/img/favicons/android-chrome-192x192.png" sizes="192x192">
	<link rel="icon" type="image/png" href="/recruitnew/common/img/favicons/favicon-48x48.png" sizes="48x48">
	<link rel="icon" type="image/png" href="/recruitnew/common/img/favicons/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="/recruitnew/common/img/favicons/favicon-16x16.png" sizes="16x16">
	<link rel="icon" type="image/png" href="/recruitnew/common/img/favicons/favicon-32x32.png" sizes="32x32">
	<meta name="msapplication-TileColor" content="#2d88ef">
	<meta name="msapplication-TileImage" content="/recruitnew/common/img/favicons/mstile-144x144.png">

	<link rel="stylesheet" href="/recruitnew/common/css/common.css?v1" />

	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-119342226-1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-119342226-1');
	</script>
</head>

<body id="cat-<?php echo $pageCat?>" class="<?php foreach($pageClass as $n){ echo "page-".$n." "; } ?>">


<div id="wrapper">

	<header class="l-header off">
		<div class="l-header-clear">
			<div class="l-header-logo"><a href="/"><img src="/recruitnew/common/img/logo_01_wh.svg" alt=""></a></div>
			<nav class="m-gnav">
				<ul class="m-gnav-links">
					<li class="m-gnav-links-item"><a href="#message">
						<span class="en">MESSAGE</span>
						<span class="ja">メッセージ</span>
					</a></li>
					<li class="m-gnav-links-item"><a href="#why">
						<span class="en">WHY</span>
						<span class="ja">なぜやるのか</span>
					</a></li>
					<li class="m-gnav-links-item"><a href="#what">
						<span class="en">WHAT</span>
						<span class="ja">私たちらしくやる</span>
					</a></li>
					<li class="m-gnav-links-item"><a href="#how">
						<span class="en">HOW</span>
						<span class="ja">何をやるのか</span>
					</a></li>
					<li class="m-gnav-links-item"><a href="#who">
						<span class="en">WHO</span>
						<span class="ja">社員インタビュー</span>
					</a></li>
				</ul>
				<p class="m-gnav-entry"><a href="#recruit">ENTRY NOW</a></p>
			</nav>
		</div>
	</header>

	<div class="m-gnav-btn">
		<div class="m-gnav-btn-lines">
			<div class="m-gnav-btn-lines-item"></div>
			<div class="m-gnav-btn-lines-item"></div>
			<div class="m-gnav-btn-lines-item"></div>
		</div>
	</div>

