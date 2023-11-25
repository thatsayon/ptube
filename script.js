let ida = 1000;

const getData = async (id = 1000) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    return data
    // gdata = [];
    // gdata.push(...data.data);
  } catch (err) {
    console.log(err)
  }
};

const showVideo = (gdata) => {
  gdata.forEach((data) => {

    const maindiv = document.getElementById("name");
    const viddiv = document.createElement("div");
    viddiv.className = 'video'

    const img = document.createElement("img");
    img.className = 'vimg'
    img.src = `${data.thumbnail}`;
    viddiv.appendChild(img);

    const time = data.others.posted_date;
    const hours = Math.floor(time / 3600);
    const rtime = time % 3600;
    const minutes = Math.floor(rtime / 60);

    if (hours !== 0 && minutes !== 0) {
      const timep = document.createElement("p");
      timep.innerText = `${hours}hrs ${minutes} min ago`
      timep.className = "timep"
      viddiv.appendChild(timep)
    }
    const vidiv = document.createElement("div");

    const profile = document.createElement("img");
    profile.src = `${data.authors[0].profile_picture}`
    profile.className = 'profilep'
    vidiv.appendChild(profile)

    // thumbnail bottom area 
    const infodiv = document.createElement("div");
    infodiv.className = "infodiv"

    const title = document.createElement("h1");
    title.className = 'vtext'
    title.innerText = `${data.title}`;
    infodiv.appendChild(title);

    // creator username and blue tick
    const creator = document.createElement("div");
    creator.className = "creator";
    const cname = document.createElement("p");
    cname.innerText = `${data.authors[0].profile_name}`
    creator.appendChild(cname);
    if (data.authors[0].verified == true) {
      const bluetick = document.createElement("img");
      bluetick.className = "blue";
      bluetick.src = "./blue.png";
      creator.appendChild(bluetick);
    }
    infodiv.appendChild(creator)

    const view = document.createElement("p");
    view.innerText = `${data.others.views}`;
    infodiv.appendChild(view);

    const fdiv = document.createElement("div");
    fdiv.className = 'fdiv'
    fdiv.appendChild(vidiv);
    fdiv.appendChild(infodiv);

    viddiv.appendChild(fdiv);
    maindiv.appendChild(viddiv);
  })
}

const shownotfound = () => {
  const name = document.getElementById("name");

  const ediv = document.createElement("div");
  ediv.className = "ediv";

  const showimg = document.createElement("img");
  showimg.src = "./Icon.png";
  ediv.appendChild(showimg);

  const showinfo = document.createElement("p");
  showinfo.innerText = "Oops!! Sorry, There is no content here";
  showinfo.className = "showinfo"
  ediv.appendChild(showinfo);

  name.appendChild(ediv);
}

const showVid = async (id = 1000) => {
  if (document.getElementById("name")) {
    document.getElementById("name").innerHTML = ''
  }
  ida = id;
  let gdata = [];
  const res = await getData(id);
  gdata.push(...res.data)
  if (gdata.length === 0) {
    shownotfound();
  } else {
    showVideo(gdata)
  }
}

showVid()

var header = document.getElementById("categorybtn")
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const gotob = () => {
  window.location.href = "blog.html"
}

const sortbyview = async () => {
  if (ida === 1005) return;
  if (document.getElementById("name")) {
    document.getElementById("name").innerHTML = ''
  }
  const data = await getData(ida);
  let d = [];
  d.push(...data.data)
  const sortd = d.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))
  console.log(sortd)
  showVideo(sortd)
}