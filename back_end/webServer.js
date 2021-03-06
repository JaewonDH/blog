const express = require("express");
const database = require("./db/database");
const cors = require("cors"); // Access-Control-Allow-Origin  해결 모듈

const multer = require("multer"); // // form-data를 받을 때 필요
const { response } = require("express");
const { addTagName } = require("./db/database");
const formData = multer({
  dest: "uploads/",
}); // form-data를 받을 때 필요

const app = express();
let portNumber = 3333;
app.use(express.static("public")); //특정 폴더의 접근을 허가
app.use(
  express.urlencoded({
    extended: false,
  })
); //포스트로 일반 json object를 받을 때 필요
app.use(express.json()); //포스트로 일반 json object를 받을 때 필요
app.use(cors());

app.listen(portNumber, () => {
  console.log(`start ${portNumber} prot`);
});

// blog 리스트 목록
app.get("/boardList/:id", function (request, response) {
  console.log("request.params.id", request.params.id);
  database.getBoardList(Number(request.params.id), (error, results) => {
    console.log("request.params.id error", error);
    if (error == null) {
      response.status(200).send(results);
    }
  });
});

// blog 글 추가
app.post("/write", formData.array(), function (request, response) {
  // front 쪽에서 post 전달 시 form data 형식으로 받을 경우
  let body = request.body;
  console.log("body", body);
  database
    .isTagName(body.tag)
    .then((result) => {
      console.log("result", result);
      return getTagName(result, body.tag);
    })
    .then((result) => {
      return database.insertBoard([body.title, getTagID(result), body.content]);
    })
    .then((result) => {
      console.log("result", result);
      response.status(200).send("게시글 등록 완료");
    })
    .catch((error) => {
      console.log("error", error);
      response.status(400).send(error);
    });
});

// board 항목의 상세 정보 가져 오기
app.get("/boardInfo/:id", (request, response) => {
  console.log("getBoardItem request.params.id", request.params.id);
  database
    .getBoardItem(request.params.id)
    .then((results) => {
      let object = results.length > 0 ? results[0] : [];
      response.status(200).send(object);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

// blog tag 목록 가져오기
app.get("/tagList", function (request, response) {
  let result = {};
  database
    .getBoardCount()
    .then((resultDB) => {
      result.totalCount = resultDB[0].count;
      console.log("result", result);
      return database.getTagList();
    })
    .then((resultDb) => {
      result.tagList = resultDb;
      console.log("result", resultDb);
      response.status(200).send(result);
    })
    .catch((error) => {
      console.log("error", error);
      response.status(400).send(error);
    });
});

// 삭제 기능
app.delete("/board/:id", (request, response) => {
  console.log("deleteBoardItem request.params.id", request.params.id);
  database
    .deleteBoardItem(request.params.id)
    .then((result) => {
      response.status(200).send("삭제완료");
    })
    .catch((error) => {
      console.log("deleteBoardItem error", error);
      response.status(400).send(error);
    });
});

// 수정 기능
app.put("/boardInfo/:id", formData.array(), (request, response) => {
  console.log("update body", request.body);
  let body = request.body;
  database
    .isTagName(body.tag)
    .then((result) => {
      return getTagName(result, body.tag);
    })
    .then((result) => {
      return database.updateBoard([
        body.title,
        getTagID(result),
        body.content,
        request.params.id,
      ]);
    })
    .then((result) => {
      response.status(200).send("수정 완료");
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

//로그인 Form
app.post("/login", formData.array(), function (request, response) {
  let body = request.body;
  console.log("email", body.email);
  console.log("password", body.password);

  if (body.email === "aaa@a.com" && body.password === "aaaa") {
    response.status(200).send({
      message: "로그인 성공",
      token: "1231jlkjlkjkjl123!@k3kjlk23",
    });
  } else {
    response.status(401).send("로그인 실패 하였습니다.");
  }
});

function getTagName(result, tag) {
  if (result.length == 0) {
    return database.addTagName(tag);
  } else {
    return result[0].id;
  }
}

function getTagID(result) {
  if (typeof result == "object") {
    return result.insertId;
  } else {
    return result;
  }
}
