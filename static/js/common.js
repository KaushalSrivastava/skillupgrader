// PRELOADER

preloader.innerHTML = ` <div class="waviy">
		   <span style="--i:1">L</span>
		   <span style="--i:2">o</span>
		   <span style="--i:3">a</span>
		   <span style="--i:4">d</span>
		   <span style="--i:5">i</span>
		   <span style="--i:6">n</span>
		   <span style="--i:7">g</span>
		   <span style="--i:8">.</span>
		   <span style="--i:9">.</span>
		   <span style="--i:10">.</span>
		</div>`;

//SIDEBAR


sidebar.innerHTML = `
<div class="dlabnav-scroll">
<ul class="metismenu" id="menu">
    <li class="dropdown header-profile">
        <a class="nav-link" href="/user/profile">
            <img src="images/ion/man (1).png" width="20" alt=""/>
            <div class="header-info ms-3">
                <span class="font-w600 ">Hi, &nbsp;<b>${sidebar.dataset.name}</b></span>
            
            </div>
        </a>
        
    </li>
    <li><a href="/user/" aria-expanded="false">
            <i class="flaticon-025-dashboard"></i>
            <span class="nav-text">Dashboard</span>
        </a>
    </li>
    <li><a href="/user/learn" aria-expanded="false">
        <i class="flaticon-086-star"></i>
        <span class="nav-text">Learn Skills</span>
    </a>

    <li><a href="/user/report" aria-expanded="false">
            <i class="flaticon-041-graph"></i>
            <span class="nav-text">Reports</span>
        </a>
    </li>
  
    <li><a href="/user/referral" class="ai-icon" aria-expanded="false">
            <i class="flaticon-013-checkmark"></i>
            <span class="nav-text">Referral</span>
        </a>
    </li>

    <li><a href="/user/profile" aria-expanded="false">
        <i class="flaticon-381-id-card-1"></i>
            <span class="nav-text">Profile</span>
        </a>
    </li>
    <li><a href="/user/terms" aria-expanded="false">
    <i class="flaticon-022-copy"></i>
    <span class="nav-text">Terms & Conditions</span>
</a>
</li>

</ul>
</div>
`;


// NAV HEADER

{/* <svg class="logo-abbr" width="53" height="53" viewBox="0 0 53 53">
    <path class="svg-logo-primary-path" d="M48.3418 41.8457H41.0957C36.8148 41.8457 33.332 38.3629 33.332 34.082C33.332 29.8011 36.8148 26.3184 41.0957 26.3184H48.3418V19.2275C48.3418 16.9408 46.4879 15.0869 44.2012 15.0869H4.14062C1.85386 15.0869 0 16.9408 0 19.2275V48.8594C0 51.1462 1.85386 53 4.14062 53H44.2012C46.4879 53 48.3418 51.1462 48.3418 48.8594V41.8457Z" fill="#5BCFC5"/>
    <path class="svg-logo-primary-path" d="M51.4473 29.4238H41.0957C38.5272 29.4238 36.4375 31.5135 36.4375 34.082C36.4375 36.6506 38.5272 38.7402 41.0957 38.7402H51.4473C52.3034 38.7402 53 38.0437 53 37.1875V30.9766C53 30.1204 52.3034 29.4238 51.4473 29.4238ZM41.0957 35.6348C40.2382 35.6348 39.543 34.9396 39.543 34.082C39.543 33.2245 40.2382 32.5293 41.0957 32.5293C41.9532 32.5293 42.6484 33.2245 42.6484 34.082C42.6484 34.9396 41.9532 35.6348 41.0957 35.6348Z" fill="#5BCFC5"/>
</svg> */}

navheader.innerHTML = `<a href="/user/" class="brand-logo">
<img class="logo-abbr" width="53" height="53" src="images/fav.png" />


<p class="brand-title" width="124px" height="33px"  style="font-size: 30px;">Menu</p>
</a>
<div class="nav-control">
<div class="hamburger">
    <span class="line"></span><span class="line"></span><span class="line"></span>
</div>
</div>`;


//FOOTER

footer.innerHTML = ` 
<div class="copyright">
<p>© - <a href="#" target="_blank">Skill Upgrader</a> | 2022</p>
</div>
`;


//HEADER

header.innerHTML = `<div class="header-content">
<nav class="navbar navbar-expand">
    <div class="collapse navbar-collapse justify-content-between">
        <div class="header-left">
            <div class="dashboard_bar">
                ${header.dataset.title}
            </div>
        </div>
        <ul class="navbar-nav header-right">
    
        
            <li class="nav-item dropdown notification_dropdown">
                <a class="nav-link bell bell-link" href="/user/logout">Logout &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28px" height="28px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2V5Zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2h6.586Z"/></svg>

                </a>
            </li>
        
            <li class="nav-item dropdown notification_dropdown">
            <a class="nav-link bell bell-link" href="/user/refresh">Refresh &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="28px" height="28px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="currentColor" fill-rule="evenodd" d="M 20 4 C 14.507813 4 10 8.507813 10 14 L 10 31.75 L 7.125 28.875 L 4.3125 31.71875 L 12 39.40625 L 19.6875 31.71875 L 16.875 28.90625 L 14 31.75 L 14 14 C 14 10.691406 16.691406 8 20 8 L 31 8 L 31 4 Z M 38 10.59375 L 30.28125 18.3125 L 33.125 21.125 L 36 18.25 L 36 36 C 36 39.308594 33.308594 42 30 42 L 19 42 L 19 46 L 30 46 C 35.492188 46 40 41.492188 40 36 L 40 18.25 L 42.875 21.125 L 45.6875 18.28125 Z"></path></svg>

            </a>
        </li>
        </ul>
    </div>
</nav>
</div>`;
