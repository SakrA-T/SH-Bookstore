<?php
$userid = $_POST['said'];
$num = $_POST['sanum'];
$bookname = $_POST['saname'];
$author=$_POST['saauthor'];
$press=$_POST['sapress'];
$date=$_POST['sadate'];
$ISBN=$_POST['saISBN'];
$sorts = $_POST['sortslt'];
$oldprice = $_POST['saoldp'];
$pin = $_POST['sapin'];
$newprice = $_POST['sanewp'];
$images = $_POST['saimg'];
$status = $_POST['sastatus'];

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");
$query="SELECT name FROM userinfo WHERE id=$userid";
$result = mysqli_query($link, $query);
// $rows = mysqli_num_rows($result);
$user = mysqli_fetch_object($result);

$flag = true;
while ($flag) {
    
    $bookid = random_int(1, 99999999);
    // print_r($id);
    $checkid = "SELECT bookid FROM booksale WHERE bookid=$bookid";
    $checkrst=mysqli_query($link, $checkid);
    $p=mysqli_fetch_object($checkrst);
    if (!$p) {
        $flag = false;
    }
}

$insert="INSERT INTO booksale VALUES ($userid,'$user->name',$bookid,'$bookname','$author','$press',$date,$ISBN,'$sorts',$oldprice,$pin,$newprice,'$images',$status)";
    if (mysqli_query($link, $insert)) {
        mysqli_close($link);
        echo "{\"code\":\"1\",\"msg\":\"添加出售成功！\"}";
    } else {
        mysqli_close($link);
        echo "{\"code\":\"-2\",\"msg\":\"出现未知错误！请联系系统管理员修复！\r\nerror code:".mysqli_error($link)."\"}";
    }