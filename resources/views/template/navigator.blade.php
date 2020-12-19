@extends('nav')

<ul class="menu">
    <li style="color: #9F3FF8;"><a href="{{url('shop/best')}}">베스트</a></li>
    <li style="color: #FF416F;"><a href="{{url('shop/body')}}">신상</a></li>
    <li>
        <a href="#">아우터</a><!-- //outer -->
        <ul class="sub">
            <li><a href="{{url('shop/card')}}">가디건/조끼</a></li><!-- //cardigan -->
            <li><a href="{{url('shop/field')}}">야상/점퍼</a></li><!-- //field -->
            <li><a href="{{url('shop/jacket')}}">자켓/코트</a></li><!-- //jacket -->
            <li><a href="{{url('shop/padding')}}">패딩</a></li><!-- //padding -->
            <li><a href="{{url('shop/fleece')}}">플리스</a></li><!-- //fleece -->
        </ul>
    </li>
    <li>
        <a href="#">상의</a><!-- //top -->
        <ul class="sub">
            <li><a href="{{url('shop/longsleeve')}}">긴팔티셔츠</a></li><!-- //longsleeves -->
            <li><a href="{{url('shop/man')}}">맨투맨</a></li><!-- //man -->
            <li><a href="{{url('shop/hood')}}">후드</a></li><!-- //hood -->
            <li><a href="{{url('shop/shortsleeve')}}">반팔/민소매티셔츠</a></li><!-- //shortsleeve -->
            <li><a href="{{url('shop/neat')}}">니트</a></li><!-- //neat -->
        </ul>
    </li>
    <li><a href="{{url('shop/shirt')}}">셔츠/블라우스</a></li><!-- //shirt or blouse -->
    <li><a href="{{url('shop/training')}}">트레이닝</a></li><!-- //training -->
    <li><a href="{{url('shop/basic')}}">베이직</a></li><!-- //basic -->
    <li><a href="{{url('shop/onepiece')}}">원피스</a></li>
    <li><a href="/shop/list.php?cate=0202">스커트</a></li>
    <li>
        <a href="/shop/list.php?cate=0201">팬츠</a>
        <ul class="sub">
            <li><a href="/shop/list.php?cate=020103">청바지</a></li>
            <li><a href="/shop/list.php?cate=020102">롱팬츠</a></li>
            <li><a href="/shop/list.php?cate=020104">면바지</a></li>
            <li><a href="/shop/list.php?cate=020106">슬랙스</a></li>
            <li><a href="/shop/list.php?cate=020105">레깅스</a></li>
            <li><a href="/shop/list.php?cate=020101">숏팬츠</a></li>
        </ul>
    </li>
    <li>
        <a href="/shop/list.php?cate=0601">가방</a>
        <ul class="sub">
            <li><a href="/shop/list.php?cate=060101">백팩/스쿨백</a></li>
            <li><a href="/shop/list.php?cate=060102">크로스/토트백</a></li>
        </ul>
    </li>
    <li>
        <a href="/shop/list.php?cate=0501">신발</a>
        <ul class="sub">
            <li><a href="/shop/list.php?cate=050101">운동화/단화</a></li>
            <li><a href="/shop/list.php?cate=050102">구두/워커</a></li>
            <li><a href="/shop/list.php?cate=050103">샌들/슬리퍼/장화</a></li>
        </ul>
    </li>
    <li>
        <a href="/shop/list.php?cate=0701">악세사리</a>
        <ul class="sub">
            <li><a href="/shop/list.php?cate=070101">주얼리</a></li>
            <li><a href="/shop/list.php?cate=070104">모자/벨트</a></li>
            <li><a href="/shop/list.php?cate=070105">양말/스타킹</a></li>
        </ul>
    </li>
<!-- 				<li> -->
<!-- 					<a href="/shop/list.php?cate=3101">선오픈</a> -->
<!-- 				</li> -->
</ul><!-- //menu -->

