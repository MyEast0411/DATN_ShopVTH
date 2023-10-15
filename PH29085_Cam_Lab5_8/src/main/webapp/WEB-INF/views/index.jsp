<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
<html>
<head>
    <title>

    </title>
</head>
<body>

<div class="container">
    <div class="row">
        <form action="/chuc-vu/search" method="post">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">NGayBD</label>
                <input type="date" class="form-control" id="exampleInputEmail1" name="ngayBD">

            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">NGayKT</label>
                <input type="date" class="form-control" id="exampleInputPassword1" name="ngayKT">
            </div>

            <button type="submit" class="btn btn-primary">Search</button>
        </form>
    </div>
   <div class="row">
       <table class="table">
           <thead>
           <tr>
               <th scope="col">#</th>
               <th scope="col">MaCV</th>
               <th scope="col">MAPB</th>
               <th scope="col">Ten</th>
               <th scope="col">NgayTao</th>
               <th scope="col">TrangThai</th>
               <th colspan="3">Action</th>
           </tr>
           </thead>
           <tbody>
           <c:forEach items="${pageCV.content}" var="cv" varStatus="loop">
           <tr>
               <td >${loop.count}</td>
               <td >${cv.ma}</td>
               <td >${cv.phongBan.ma}</td>
               <td >${cv.ten}</td>
               <td >${cv.ngayTao}</td>
               <td >${cv.trangThai == 1?"HD":"KHD"}</td>
               <td >
                   <a href="/chuc-vu/detail/${cv.id}" class="btn btn-outline-primary">Detail</a>
                   <a href="/chuc-vu/delete/${cv.id}" class="btn btn-outline-danger">Delete</a>
                   <a href="/chuc-vu/view-update/${cv.id}" class="btn btn-outline-warning">Update</a>
               </td>


           </tr>
           </c:forEach>
           </tbody>
       </table>
       <nav aria-label="Page navigation example">
           <ul class="pagination">
              <c:forEach begin="0" end="${pageCV.totalPages-1}" varStatus="loop">
               <li class="page-item"><a class="page-link" href="/chuc-vu/hien-thi?page=${loop.count-1 }">${loop.count }</a></li>
              </c:forEach>
                </ul>
       </nav>
   </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>