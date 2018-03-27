<?php
$id=$_POST['userid'];

$link=mysqli_connect("localhost", "root", "937461995", "bookstore") or die("{\"code\":-1,\"msg\":\"连接数据库时出现错误！请联系系统管理员进行修复！\r\nerror code:".mysqli_connect_error()."\"}");

$query="SELECT id,name from userinfo where id = $id";

$result=mysqli_query($link, $query);
$row=mysqli_fetch_object($result);
$json="[";
$json.="{\"id\":" . $row->id . ",\"name\":\"" . $row->name . "\"}";
$json.="]";
echo $json;