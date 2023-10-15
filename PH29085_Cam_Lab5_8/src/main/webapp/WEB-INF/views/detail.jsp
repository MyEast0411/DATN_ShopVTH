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
       <p>Ma CV : ${cv.ma} </p>
       <p>Ma PB :   ${cv.phongBan.ma}  <span>Ten PB :  ${cv.phongBan.ten}  </span></p>
       <p>Ten : ${cv.ten} </p>

        <p>Ghi chu : ${cv.ghiChu}</p>
        <div class="mb-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" ${cv.trangThai == 1 ? "checked":""}>
                <label class="form-check-label" for="flexRadioDefault1">
                    HD
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio"  ${cv.trangThai == 0 ? "checked":""} >
                <label class="form-check-label" for="flexRadioDefault2">
                    KHD
                </label>
            </div>
        </div>

        <p>NgayTao : ${cv.ngayTao}</p>


    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>