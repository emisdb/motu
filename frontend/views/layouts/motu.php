<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use frontend\assets\AppAsset;


AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <link rel="stylesheet" href="css/animation.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <!--        <script src="https://api-maps.yandex.ru/2.1/?apikey=e46c6ff8-eed4-4d0a-ad07-ae2f1173c5f9&lang=ru_RU" type="text/javascript">-->
    <script src="https://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU&coordorder=longlat"></script>
	<?php $this->head() ?>
</head>
    <body>
	<?php $this->beginBody() ?>
    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h4>Selection result:</h4>
            </div>
            <div class="modal-body" id="myModalContent">
             </div>
            <div class="modal-footer" id="myModalFooter">
                <h4>MOTU</h4>
            </div>
        </div>

    </div>
 			<?= $content ?>
    <div class="header fadeInDown">
        <div id="myMenu" >ПЛАТФОРМА #MOTU</div> <div id="myResult"></div>
    </div>
    <div class="footer fadeInUp">
        <h2><a href="#" id="myBtn" >ПЛАТФОРМА #MOTU</a></h2>
    </div>
	<?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>