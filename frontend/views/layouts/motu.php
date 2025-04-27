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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <!--    <script src="https://api-maps.yandex.ru/2.1/?apikey=e46c6ff8-eed4-4d0a-ad07-ae2f1173c5f9&lang=ru_RU&coordorder=longlat" type="text/javascript"> -->
     <script src="https://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU&coordorder=longlat"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flickity/1.0.0/flickity.pkgd.js"></script>
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
    <div id="title_center" class="map_notes">
        <div id="tc_title">
            <img src="images/icons/pin.svg" />
            Санкт - Петербург
        </div>
        <div id="tc_whether">
            <img src="images/icons/weather.svg" />
            +3&#8451;
        </div>
    </div>
    <div id="title_right" class="map_notes">
        <div id="selected_bage" class="notification">
            <img src="images/icons/route.svg" />
            <span class="badge red" >0</span>
        </div>
        <div id="recommend_bage" class="notification">
            <img src="images/icons/compass.svg" />
            <span class="badge" >24</span>
        </div>

        <img src="images/icons/state.svg" />
    </div>
    <div id="title_face" class="map_notes">
        <img src="images/vitya.png" style="width:45px;" />
    </div>
    <div id="sidebar" class="sidebar_motu_open map_notes slideInLeftOpen">
        <div class="sidebar_row sidebar_row_line">
            <div id="sidebar_logo">
				<?=Html::a('<img src="images/icons/motu_logo_new.svg" />',['real']); ?>
            </div>
            <div id="sidebar_back">
				<?=Html::a('<img src="images/icons/back.svg" />','#',['onclick'=>'app.setControl(0)']); ?>
                Назад
            </div>
            <div id="sidebar_1_2">
				<?=Html::a('<img src="images/icons/arrow_left.svg" />','#'); ?>
            </div>
        </div>
        <div id="display_area">
            <div class="sidebar_row">
               <div class="input_container">
                    <input type="text" id="input" value>
                    <?=Html::a('<img src="images/icons/search.svg" />','#',['class'=>'input_img']); ?>
                 </div>
            </div>
            <div id="control_area">
                <div class="sidebar_row">
                    <?=Html::a('<img src="images/icons/cafe.svg" />Поесть','#',['id'=>'eat','class'=>'sidebar_cat_button','onclick' => 'app.setCategory([1])']); ?>
                    <?=Html::a('<img src="images/icons/bag.svg" />Покупки','#',['id'=>'buy','class'=>'sidebar_cat_button','onclick' => 'app.setCategory([3])']); ?>
                </div>
                <div class="sidebar_row sidebar_row_line">
                    <?=Html::a('<img src="images/icons/museum.svg" />Знакомство с городом','#',['id'=>'sight','class'=>'sidebar_cat_button','onclick' => 'app.setCategory([2,5])']); ?>
                    <?=Html::a('<img src="images/icons/crown.svg" />Планы на вечер','#',['id'=>'night','class'=>'sidebar_cat_button','onclick' => 'app.setCategory([4])']); ?>
                </div>
            </div>
            <div id="recommend" class="recommend">
                <div class="sidebar_row">
                    <div class="label">Рекомендации</div>
                    <div id="recommend_number" class="label"></div>
                </div>
                <div class="sidebar_row recommend" >
                    <div id="recommend_list"></div>
                </div>
             </div>
        </div>
    </div>
	<?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>
