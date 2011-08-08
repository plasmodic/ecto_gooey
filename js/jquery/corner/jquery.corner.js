
    

  

<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <script type="text/javascript">var NREUMQ=[];NREUMQ.push(["mark","firstbyte",new Date().getTime()]);</script>
        <title>jquery.corner.js at master from malsup/corner - GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="387a8bcf8989a9798cca922f5f7cce615aa0c743" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/6f9e27027eef60d6613ff66ff14e06bbcb5e1fde/stylesheets/bundle_github.css" media="screen" rel="stylesheet" type="text/css" />
    

    <script type="text/javascript">
      if (typeof console == "undefined" || typeof console.log == "undefined")
        console = { log: function() {} }
    </script>
    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/jquery/jquery-1.6.1.min.js" type="text/javascript"></script>
    <script src="https://a248.e.akamai.net/assets.github.com/fc70f9d522e5f3a5919e75c060f0c7baaa64b93e/javascripts/bundle_failbot.js" type="text/javascript"></script>


    <script type="text/javascript" charset="utf-8">
      var GitHub = {
        assetHost: 'https://a248.e.akamai.net/assets.github.com'
      }
      var github_user = 'vrabaud'

      
    </script>
    <script src="https://a248.e.akamai.net/assets.github.com/5ac63fc026168719ba8c8f21a3a0e80b8e93be5e/javascripts/bundle_github.js" type="text/javascript"></script>


    
    <script type="text/javascript" charset="utf-8">
      if (GitHub.spy) {
        GitHub.spy({repo: "malsup/corner"});
      }
    </script>

    
  <link rel='permalink' href='/malsup/corner/blob/7ebb1bfc911faaa029d0b229303187f6c5cc5c07/jquery.corner.js'>

  <link href="https://github.com/malsup/corner/commits/master.atom" rel="alternate" title="Recent Commits to corner:master" type="application/atom+xml" />

    

    <meta name="description" content="corner - jQuery Corner Plugin (by Dave Methvin and Mike Alsup)" />
    <script type="text/javascript">
      GitHub.nameWithOwner = GitHub.nameWithOwner || "malsup/corner";
      GitHub.currentRef = 'master';
      GitHub.commitSHA = "7ebb1bfc911faaa029d0b229303187f6c5cc5c07";
      GitHub.currentPath = 'jquery.corner.js';
      GitHub.masterBranch = "master";

      
    </script>
  

        <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-3769691-2']);
      _gaq.push(['_setDomainName', 'none']);
      _gaq.push(['_trackPageview']);
      _gaq.push(['_trackPageLoadTime']);
      (function() {
        var ga = document.createElement('script');
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        ga.setAttribute('async', 'true');
        document.documentElement.firstChild.appendChild(ga);
      })();
    </script>

    
  </head>

  

  <body class="logged_in page-blob linux env-production">
    

    

    

    <div class="subnavd" id="main">
      <div id="header" class="true">
          <a class="logo boring" href="https://github.com/">
            
            <img alt="github" class="default" height="45" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov6.png" />
            <!--[if (gt IE 8)|!(IE)]><!-->
            <img alt="github" class="hover" height="45" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov6-hover.png" />
            <!--<![endif]-->
          </a>

        
          





  
    <div class="userbox">
      <div class="avatarname">
        <a href="https://github.com/vrabaud"><img src="https://secure.gravatar.com/avatar/cc30ac48a693633fa4d05d66238eaff8?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" alt="" width="20" height="20"  /></a>
        <a href="https://github.com/vrabaud" class="name">vrabaud</a>

        
        
          <a href="https://github.com/inbox/notifications" class="unread_count notifications_count new tooltipped downwards js-notification-count" title="Unread Notifications">95</a>
        
      </div>
      <ul class="usernav">
        <li><a href="https://github.com/">Dashboard</a></li>
        <li>
          
          <a href="https://github.com/inbox">Inbox</a>
          <a href="https://github.com/inbox" class="unread_count new js-inbox-count">1</a>
        </li>
        <li><a href="https://github.com/account">Account Settings</a></li>
        <li><a href="/logout">Log Out</a></li>
      </ul>
    </div><!-- /.userbox -->
  


        
        <div class="topsearch">
  
    <form action="/search" id="top_search_form" method="get">
      <a href="/search" class="advanced-search tooltipped downwards" title="Advanced Search">Advanced Search</a>
      <div class="search placeholder-field js-placeholder-field">
        <label class="placeholder" for="global-search-field">Search…</label>
        <input type="text" class="search my_repos_autocompleter" id="global-search-field" name="q" results="5" /> <input type="submit" value="Search" class="button" />
      </div>
      <input type="hidden" name="type" value="Everything" />
      <input type="hidden" name="repo" value="" />
      <input type="hidden" name="langOverride" value="" />
      <input type="hidden" name="start_value" value="1" />
    </form>
    <ul class="nav">
      <li><a href="/explore">Explore GitHub</a></li>
      <li><a href="https://gist.github.com">Gist</a></li>
      
      <li><a href="/blog">Blog</a></li>
      
      <li><a href="http://help.github.com">Help</a></li>
    </ul>
  
</div>

      </div>

      
      
        
    <div class="site">
      <div class="pagehead repohead vis-public    instapaper_ignore readability-menu">

      

      <div class="title-actions-bar">
        <h1>
          <a href="/malsup">malsup</a> / <strong><a href="/malsup/corner">corner</a></strong>
          
          
        </h1>

        
    <ul class="actions">
      

      
        <li class="for-owner" style="display:none"><a href="/malsup/corner/admin" class="minibutton btn-admin "><span><span class="icon"></span>Admin</span></a></li>
        <li>
          <a href="/malsup/corner/toggle_watch" class="minibutton btn-watch " id="watch_button" onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', '387a8bcf8989a9798cca922f5f7cce615aa0c743'); f.appendChild(s);f.submit();return false;" style="display:none"><span><span class="icon"></span>Watch</span></a>
          <a href="/malsup/corner/toggle_watch" class="minibutton btn-watch " id="unwatch_button" onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', '387a8bcf8989a9798cca922f5f7cce615aa0c743'); f.appendChild(s);f.submit();return false;" style="display:none"><span><span class="icon"></span>Unwatch</span></a>
        </li>
        
          
            <li class="for-notforked"><a href="#fork_box" class="minibutton btn-fork " rel="facebox"><span><span class="icon"></span>Fork</span></a></li>
            

            <div id="fork_box" style="display:none">
              <h2>Where do you want to fork this to?</h2>
              
                <div class="full-button">
                  <form action="/malsup/corner/fork" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="387a8bcf8989a9798cca922f5f7cce615aa0c743" /></div>
                    <button class="classy"><span>Fork to vrabaud</span></button>
                  </form>
                </div>
              
              
                <div class="rule"></div>
                
                  <div class="full-button">
                    <form action="/malsup/corner/fork" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="387a8bcf8989a9798cca922f5f7cce615aa0c743" /></div>
                      <input id="organization" name="organization" type="hidden" value="plasmodic" />
                      <button class="classy"><span>Fork to plasmodic (organization)</span></button>
                    </form>
                  </div>
                
              
            </div>
          

          <li id='pull_request_item' class='nspr' style='display:none'><a href="/malsup/corner/pull/new/master" class="minibutton btn-pull-request "><span><span class="icon"></span>Pull Request</span></a></li>
        
      
      
      <li class="repostats">
        <ul class="repo-stats">
          <li class="watchers"><a href="/malsup/corner/watchers" title="Watchers" class="tooltipped downwards">348</a></li>
          <li class="forks"><a href="/malsup/corner/network" title="Forks" class="tooltipped downwards">34</a></li>
        </ul>
      </li>
    </ul>

      </div>

        
  <ul class="tabs">
    <li><a href="/malsup/corner" class="selected" highlight="repo_source">Source</a></li>
    <li><a href="/malsup/corner/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/malsup/corner/network" highlight="repo_network">Network</a></li>
    <li><a href="/malsup/corner/pulls" highlight="repo_pulls">Pull Requests (0)</a></li>

    

    
      
      <li><a href="/malsup/corner/issues" highlight="issues">Issues (25)</a></li>
    

                <li><a href="/malsup/corner/wiki" highlight="repo_wiki">Wiki (2)</a></li>
        
    <li><a href="/malsup/corner/graphs" highlight="repo_graphs">Graphs</a></li>

    

    <li class="contextswitch nochoices">
      <span class="toggle leftwards" >
        <em>Branch:</em>
        <code>master</code>
      </span>
    </li>
  </ul>

  <div style="display:none" id="pl-description"><p><em class="placeholder">click here to add a description</em></p></div>
  <div style="display:none" id="pl-homepage"><p><em class="placeholder">click here to add a homepage</em></p></div>

  <div class="subnav-bar">
  
  <ul>
    <li>
      <a href="/malsup/corner/branches" class="dropdown">Switch Branches (1)</a>
      <ul>
        
          
            <li><strong>master &#x2713;</strong></li>
            
      </ul>
    </li>
    <li>
      <a href="#" class="dropdown defunct">Switch Tags (0)</a>
      
    </li>
    <li>
    
    <a href="/malsup/corner/branches" class="manage">Branch List</a>
    
    </li>
  </ul>
</div>

  
  
  
  
  
  



        
    <div id="repo_details" class="metabox clearfix">
      <div id="repo_details_loader" class="metabox-loader" style="display:none">Sending Request&hellip;</div>

      
        <a href="/malsup/corner/downloads" class="download-source" id="download_button" title="Download source, tagged packages and binaries."><span class="icon"></span>Downloads</a>
      

      <div id="repository_desc_wrapper">
      <div id="repository_description" rel="repository_description_edit">
        
          <p>jQuery Corner Plugin (by Dave Methvin and Mike Alsup)
            <span id="read_more" style="display:none">&mdash; <a href="#readme">Read more</a></span>
          </p>
        
      </div>

      <div id="repository_description_edit" style="display:none;" class="inline-edit">
        <form action="/malsup/corner/admin/update" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="387a8bcf8989a9798cca922f5f7cce615aa0c743" /></div>
          <input type="hidden" name="field" value="repository_description">
          <input type="text" class="textfield" name="value" value="jQuery Corner Plugin (by Dave Methvin and Mike Alsup)">
          <div class="form-actions">
            <button class="minibutton"><span>Save</span></button> &nbsp; <a href="#" class="cancel">Cancel</a>
          </div>
        </form>
      </div>

      
      <div class="repository-homepage" id="repository_homepage" rel="repository_homepage_edit">
        <p><a href="http://jquery.malsup.com/corner/" rel="nofollow">http://jquery.malsup.com/corner/</a></p>
      </div>

      <div id="repository_homepage_edit" style="display:none;" class="inline-edit">
        <form action="/malsup/corner/admin/update" method="post"><div style="margin:0;padding:0"><input name="authenticity_token" type="hidden" value="387a8bcf8989a9798cca922f5f7cce615aa0c743" /></div>
          <input type="hidden" name="field" value="repository_homepage">
          <input type="text" class="textfield" name="value" value="http://jquery.malsup.com/corner/">
          <div class="form-actions">
            <button class="minibutton"><span>Save</span></button> &nbsp; <a href="#" class="cancel">Cancel</a>
          </div>
        </form>
      </div>
      </div>
      <div class="rule "></div>
      <div class="url-box">
  

  <ul class="clone-urls">
    
      
      <li class="http_clone_url"><a href="https://github.com/malsup/corner.git" data-permissions="Read-Only">HTTP</a></li>
      <li class="public_clone_url"><a href="git://github.com/malsup/corner.git" data-permissions="Read-Only">Git Read-Only</a></li>
    
    
  </ul>
  <input type="text" spellcheck="false" class="url-field" />
        <span style="display:none" id="clippy_1035" class="url-box-clippy"></span>
      <span id="clippy_tooltip_clippy_1035" class="clippy-tooltip tooltipped" title="copy to clipboard">
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="14"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=clippy_1035&amp;copied=&amp;copyto=">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?v5"
             width="14"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=clippy_1035&amp;copied=&amp;copyto="
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      </span>

  <p class="url-description"><strong>Read+Write</strong> access</p>
</div>

    </div>

    <div class="frame frame-center tree-finder" style="display:none">
      <div class="breadcrumb">
        <b><a href="/malsup/corner">corner</a></b> /
        <input class="tree-finder-input" type="text" name="query" autocomplete="off" spellcheck="false">
      </div>

      
        <div class="octotip">
          <p>
            <a href="/malsup/corner/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever">Dismiss</a>
            <strong>Octotip:</strong> You've activated the <em>file finder</em> by pressing <span class="kbd">t</span>
            Start typing to filter the file list. Use <span class="kbd badmono">↑</span> and <span class="kbd badmono">↓</span> to navigate,
            <span class="kbd">enter</span> to view files.
          </p>
        </div>
      

      <table class="tree-browser" cellpadding="0" cellspacing="0">
        <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
        <tr class="js-no-results no-results" style="display: none">
          <th colspan="2">No matching files</th>
        </tr>
        <tbody class="js-results-list">
        </tbody>
      </table>
    </div>

    <div id="jump-to-line" style="display:none">
      <h2>Jump to Line</h2>
      <form>
        <input class="textfield" type="text">
        <div class="full-button">
          <button type="submit" class="classy">
            <span>Go</span>
          </button>
        </div>
      </form>
    </div>


        

      </div><!-- /.pagehead -->

      

  







<script type="text/javascript">
  GitHub.downloadRepo = '/malsup/corner/archives/master'
  GitHub.revType = "master"

  GitHub.repoName = "corner"
  GitHub.controllerName = "blob"
  GitHub.actionName     = "show"
  GitHub.currentAction  = "blob#show"

  
    GitHub.loggedIn = true
    GitHub.hasWriteAccess = false
    GitHub.hasAdminAccess = false
    GitHub.watchingRepo = false
    GitHub.ignoredRepo = false
    GitHub.hasForkOfRepo = ""
    GitHub.hasForked = false
  

  
</script>







  <div id="commit">
    <div class="group">
        
  <div class="envelope commit">
    <div class="human">
      
        <div class="message"><pre><a href="/malsup/corner/commit/7ebb1bfc911faaa029d0b229303187f6c5cc5c07">merge changes from chrisdew and bump ver</a> </pre></div>
      

      <div class="actor">
        <div class="gravatar">
          
          <img src="https://secure.gravatar.com/avatar/bc5a05e7a6824f0b9aa95d9b7a0b8beb?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" alt="" width="30" height="30"  />
        </div>
        <div class="name"><a href="/malsup">malsup</a> <span>(author)</span></div>
        <div class="date">
          <time class="js-relative-date" datetime="2011-05-23T16:37:18-07:00" title="2011-05-23 16:37:18">May 23, 2011</time>
        </div>
      </div>

      

    </div>
    <div class="machine">
      <span>c</span>ommit&nbsp;&nbsp;<a href="/malsup/corner/commit/7ebb1bfc911faaa029d0b229303187f6c5cc5c07" class="js-commit-link" data-key="c">7ebb1bfc911faaa029d0</a><br />
      <span>t</span>ree&nbsp;&nbsp;&nbsp;&nbsp;<a href="/malsup/corner/tree/7ebb1bfc911faaa029d0b229303187f6c5cc5c07" class="js-tree-link" data-key="t">afe82c6384ab184e0f3c</a><br />
      
        <span>p</span>arent&nbsp;
        
        <a href="/malsup/corner/tree/f5a2d3514e1b01c208ce690e402468844eeea2a3" class="js-parent-link" data-key="p">f5a2d3514e1b01c208ce</a>
      

    </div>
  </div>

    </div>
  </div>



  <div id="slider">

  

    <div class="breadcrumb" data-path="jquery.corner.js/">
      <b><a href="/malsup/corner/tree/7ebb1bfc911faaa029d0b229303187f6c5cc5c07">corner</a></b> / jquery.corner.js       <span style="display:none" id="clippy_3748" class="clippy">jquery.corner.js</span>
      
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
              width="110"
              height="14"
              class="clippy"
              id="clippy" >
      <param name="movie" value="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?v5"/>
      <param name="allowScriptAccess" value="always" />
      <param name="quality" value="high" />
      <param name="scale" value="noscale" />
      <param NAME="FlashVars" value="id=clippy_3748&amp;copied=copied!&amp;copyto=copy to clipboard">
      <param name="bgcolor" value="#FFFFFF">
      <param name="wmode" value="opaque">
      <embed src="https://a248.e.akamai.net/assets.github.com/flash/clippy.swf?v5"
             width="110"
             height="14"
             name="clippy"
             quality="high"
             allowScriptAccess="always"
             type="application/x-shockwave-flash"
             pluginspage="http://www.macromedia.com/go/getflashplayer"
             FlashVars="id=clippy_3748&amp;copied=copied!&amp;copyto=copy to clipboard"
             bgcolor="#FFFFFF"
             wmode="opaque"
      />
      </object>
      

    </div>

    <div class="frames">
      <div class="frame frame-center" data-path="jquery.corner.js/" data-permalink-url="/malsup/corner/blob/7ebb1bfc911faaa029d0b229303187f6c5cc5c07/jquery.corner.js">
        
          <ul class="big-actions">
            
            <li><a class="file-edit-link minibutton" href="/malsup/corner/edit/__current_ref__/jquery.corner.js"><span>Edit this file</span></a></li>
          </ul>
        

        <div id="files">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><img alt="Txt" height="16" src="https://a248.e.akamai.net/assets.github.com/images/icons/txt.png" width="16" /></span>
                <span class="mode" title="File Mode">100644</span>
                
                  <span>250 lines (225 sloc)</span>
                
                <span>11.226 kb</span>
              </div>
              <ul class="actions">
                <li><a href="/malsup/corner/raw/master/jquery.corner.js" id="raw-url">raw</a></li>
                
                  <li><a href="/malsup/corner/blame/master/jquery.corner.js">blame</a></li>
                
                <li><a href="/malsup/corner/commits/master/jquery.corner.js">history</a></li>
              </ul>
            </div>
            
  <div class="data type-javascript">
    
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
</pre>
          </td>
          <td width="100%">
            
              
                <div class="highlight"><pre><div class='line' id='LC1'><span class="cm">/*!</span></div><div class='line' id='LC2'><span class="cm"> * jQuery corner plugin: simple corner rounding</span></div><div class='line' id='LC3'><span class="cm"> * Examples and documentation at: http://jquery.malsup.com/corner/</span></div><div class='line' id='LC4'><span class="cm"> * version 2.12 (23-MAY-2011)</span></div><div class='line' id='LC5'><span class="cm"> * Requires jQuery v1.3.2 or later</span></div><div class='line' id='LC6'><span class="cm"> * Dual licensed under the MIT and GPL licenses:</span></div><div class='line' id='LC7'><span class="cm"> * http://www.opensource.org/licenses/mit-license.php</span></div><div class='line' id='LC8'><span class="cm"> * http://www.gnu.org/licenses/gpl.html</span></div><div class='line' id='LC9'><span class="cm"> * Authors: Dave Methvin and Mike Alsup</span></div><div class='line' id='LC10'><span class="cm"> */</span></div><div class='line' id='LC11'><br/></div><div class='line' id='LC12'><span class="cm">/**</span></div><div class='line' id='LC13'><span class="cm"> *  corner() takes a single string argument:  $(&#39;#myDiv&#39;).corner(&quot;effect corners width&quot;)</span></div><div class='line' id='LC14'><span class="cm"> *</span></div><div class='line' id='LC15'><span class="cm"> *  effect:  name of the effect to apply, such as round, bevel, notch, bite, etc (default is round). </span></div><div class='line' id='LC16'><span class="cm"> *  corners: one or more of: top, bottom, tr, tl, br, or bl.  (default is all corners)</span></div><div class='line' id='LC17'><span class="cm"> *  width:   width of the effect; in the case of rounded corners this is the radius. </span></div><div class='line' id='LC18'><span class="cm"> *           specify this value using the px suffix such as 10px (yes, it must be pixels).</span></div><div class='line' id='LC19'><span class="cm"> */</span></div><div class='line' id='LC20'><span class="p">;(</span><span class="kd">function</span><span class="p">(</span><span class="nx">$</span><span class="p">)</span> <span class="p">{</span> </div><div class='line' id='LC21'><br/></div><div class='line' id='LC22'><span class="kd">var</span> <span class="nx">style</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">,</span></div><div class='line' id='LC23'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">moz</span> <span class="o">=</span> <span class="nx">style</span><span class="p">[</span><span class="s1">&#39;MozBorderRadius&#39;</span><span class="p">]</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">,</span></div><div class='line' id='LC24'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">webkit</span> <span class="o">=</span> <span class="nx">style</span><span class="p">[</span><span class="s1">&#39;WebkitBorderRadius&#39;</span><span class="p">]</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">,</span></div><div class='line' id='LC25'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">radius</span> <span class="o">=</span> <span class="nx">style</span><span class="p">[</span><span class="s1">&#39;borderRadius&#39;</span><span class="p">]</span> <span class="o">!==</span> <span class="kc">undefined</span> <span class="o">||</span> <span class="nx">style</span><span class="p">[</span><span class="s1">&#39;BorderRadius&#39;</span><span class="p">]</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">,</span></div><div class='line' id='LC26'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">mode</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">documentMode</span> <span class="o">||</span> <span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC27'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">noBottomFold</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">msie</span> <span class="o">&amp;&amp;</span> <span class="p">((</span><span class="nx">$</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">version</span> <span class="o">&lt;</span> <span class="mi">8</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">mode</span><span class="p">)</span> <span class="o">||</span> <span class="nx">mode</span> <span class="o">&lt;</span> <span class="mi">8</span><span class="p">),</span></div><div class='line' id='LC28'><br/></div><div class='line' id='LC29'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">expr</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">msie</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC30'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">div</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">);</span></div><div class='line' id='LC31'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">try</span> <span class="p">{</span> <span class="nx">div</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">setExpression</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">,</span><span class="s1">&#39;0+0&#39;</span><span class="p">);</span> <span class="nx">div</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">removeExpression</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">);</span> <span class="p">}</span></div><div class='line' id='LC32'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">catch</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span> <span class="k">return</span> <span class="kc">false</span><span class="p">;</span> <span class="p">}</span></div><div class='line' id='LC33'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC34'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">})();</span></div><div class='line' id='LC35'><br/></div><div class='line' id='LC36'><span class="nx">$</span><span class="p">.</span><span class="nx">support</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">support</span> <span class="o">||</span> <span class="p">{};</span></div><div class='line' id='LC37'><span class="nx">$</span><span class="p">.</span><span class="nx">support</span><span class="p">.</span><span class="nx">borderRadius</span> <span class="o">=</span> <span class="nx">moz</span> <span class="o">||</span> <span class="nx">webkit</span> <span class="o">||</span> <span class="nx">radius</span><span class="p">;</span> <span class="c1">// so you can do:  if (!$.support.borderRadius) $(&#39;#myDiv&#39;).corner();</span></div><div class='line' id='LC38'><br/></div><div class='line' id='LC39'><span class="kd">function</span> <span class="nx">sz</span><span class="p">(</span><span class="nx">el</span><span class="p">,</span> <span class="nx">p</span><span class="p">)</span> <span class="p">{</span> </div><div class='line' id='LC40'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">el</span><span class="p">,</span><span class="nx">p</span><span class="p">))</span><span class="o">||</span><span class="mi">0</span><span class="p">;</span> </div><div class='line' id='LC41'><span class="p">};</span></div><div class='line' id='LC42'><span class="kd">function</span> <span class="nx">hex2</span><span class="p">(</span><span class="nx">s</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC43'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">s</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">s</span><span class="p">).</span><span class="nx">toString</span><span class="p">(</span><span class="mi">16</span><span class="p">);</span></div><div class='line' id='LC44'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="p">(</span> <span class="nx">s</span><span class="p">.</span><span class="nx">length</span> <span class="o">&lt;</span> <span class="mi">2</span> <span class="p">)</span> <span class="o">?</span> <span class="s1">&#39;0&#39;</span><span class="o">+</span><span class="nx">s</span> <span class="o">:</span> <span class="nx">s</span><span class="p">;</span></div><div class='line' id='LC45'><span class="p">};</span></div><div class='line' id='LC46'><span class="kd">function</span> <span class="nx">gpc</span><span class="p">(</span><span class="nx">node</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC47'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">while</span><span class="p">(</span><span class="nx">node</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC48'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">v</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">node</span><span class="p">,</span><span class="s1">&#39;backgroundColor&#39;</span><span class="p">),</span> <span class="nx">rgb</span><span class="p">;</span></div><div class='line' id='LC49'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">v</span> <span class="o">&amp;&amp;</span> <span class="nx">v</span> <span class="o">!=</span> <span class="s1">&#39;transparent&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">v</span> <span class="o">!=</span> <span class="s1">&#39;rgba(0, 0, 0, 0)&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC50'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">v</span><span class="p">.</span><span class="nx">indexOf</span><span class="p">(</span><span class="s1">&#39;rgb&#39;</span><span class="p">)</span> <span class="o">&gt;=</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span> </div><div class='line' id='LC51'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">rgb</span> <span class="o">=</span> <span class="nx">v</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="sr">/\d+/g</span><span class="p">);</span> </div><div class='line' id='LC52'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="s1">&#39;#&#39;</span><span class="o">+</span> <span class="nx">hex2</span><span class="p">(</span><span class="nx">rgb</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span> <span class="o">+</span> <span class="nx">hex2</span><span class="p">(</span><span class="nx">rgb</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span> <span class="o">+</span> <span class="nx">hex2</span><span class="p">(</span><span class="nx">rgb</span><span class="p">[</span><span class="mi">2</span><span class="p">]);</span></div><div class='line' id='LC53'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC54'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">v</span><span class="p">;</span></div><div class='line' id='LC55'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC56'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">node</span><span class="p">.</span><span class="nx">nodeName</span><span class="p">.</span><span class="nx">toLowerCase</span><span class="p">()</span> <span class="o">==</span> <span class="s1">&#39;html&#39;</span><span class="p">)</span></div><div class='line' id='LC57'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">break</span><span class="p">;</span></div><div class='line' id='LC58'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">node</span> <span class="o">=</span> <span class="nx">node</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">;</span> <span class="c1">// keep walking if transparent</span></div><div class='line' id='LC59'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC60'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="s1">&#39;#ffffff&#39;</span><span class="p">;</span></div><div class='line' id='LC61'><span class="p">};</span></div><div class='line' id='LC62'><br/></div><div class='line' id='LC63'><span class="kd">function</span> <span class="nx">getWidth</span><span class="p">(</span><span class="nx">fx</span><span class="p">,</span> <span class="nx">i</span><span class="p">,</span> <span class="nx">width</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC64'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">switch</span><span class="p">(</span><span class="nx">fx</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC65'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;round&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="mi">1</span><span class="o">-</span><span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">asin</span><span class="p">(</span><span class="nx">i</span><span class="o">/</span><span class="nx">width</span><span class="p">))));</span></div><div class='line' id='LC66'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;cool&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="mi">1</span><span class="o">+</span><span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">asin</span><span class="p">(</span><span class="nx">i</span><span class="o">/</span><span class="nx">width</span><span class="p">))));</span></div><div class='line' id='LC67'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;sharp&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nx">width</span><span class="o">-</span><span class="nx">i</span><span class="p">;</span></div><div class='line' id='LC68'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;bite&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">asin</span><span class="p">((</span><span class="nx">width</span><span class="o">-</span><span class="nx">i</span><span class="o">-</span><span class="mi">1</span><span class="p">)</span><span class="o">/</span><span class="nx">width</span><span class="p">))));</span></div><div class='line' id='LC69'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;slide&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">atan2</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span><span class="nx">width</span><span class="o">/</span><span class="nx">i</span><span class="p">)));</span></div><div class='line' id='LC70'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;jut&#39;</span><span class="o">:</span>    <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">atan2</span><span class="p">(</span><span class="nx">width</span><span class="p">,(</span><span class="nx">width</span><span class="o">-</span><span class="nx">i</span><span class="o">-</span><span class="mi">1</span><span class="p">))));</span></div><div class='line' id='LC71'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;curl&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">atan</span><span class="p">(</span><span class="nx">i</span><span class="p">)));</span></div><div class='line' id='LC72'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;tear&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">cos</span><span class="p">(</span><span class="nx">i</span><span class="p">)));</span></div><div class='line' id='LC73'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;wicked&#39;</span><span class="o">:</span> <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">tan</span><span class="p">(</span><span class="nx">i</span><span class="p">)));</span></div><div class='line' id='LC74'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;long&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">sqrt</span><span class="p">(</span><span class="nx">i</span><span class="p">)));</span></div><div class='line' id='LC75'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;sculpt&#39;</span><span class="o">:</span> <span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nx">width</span><span class="o">*</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">log</span><span class="p">((</span><span class="nx">width</span><span class="o">-</span><span class="nx">i</span><span class="o">-</span><span class="mi">1</span><span class="p">),</span><span class="nx">width</span><span class="p">)));</span></div><div class='line' id='LC76'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;dogfold&#39;</span><span class="o">:</span></div><div class='line' id='LC77'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;dog&#39;</span><span class="o">:</span>    <span class="k">return</span> <span class="p">(</span><span class="nx">i</span><span class="o">&amp;</span><span class="mi">1</span><span class="p">)</span> <span class="o">?</span> <span class="p">(</span><span class="nx">i</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC78'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;dog2&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="p">(</span><span class="nx">i</span><span class="o">&amp;</span><span class="mi">2</span><span class="p">)</span> <span class="o">?</span> <span class="p">(</span><span class="nx">i</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC79'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;dog3&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="p">(</span><span class="nx">i</span><span class="o">&amp;</span><span class="mi">3</span><span class="p">)</span> <span class="o">?</span> <span class="p">(</span><span class="nx">i</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span> <span class="o">:</span> <span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC80'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;fray&#39;</span><span class="o">:</span>   <span class="k">return</span> <span class="p">(</span><span class="nx">i</span><span class="o">%</span><span class="mi">2</span><span class="p">)</span><span class="o">*</span><span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC81'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;notch&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nx">width</span><span class="p">;</span> </div><div class='line' id='LC82'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;bevelfold&#39;</span><span class="o">:</span></div><div class='line' id='LC83'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;bevel&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nx">i</span><span class="o">+</span><span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC84'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;steep&#39;</span><span class="o">:</span>  <span class="k">return</span> <span class="nx">i</span><span class="o">/</span><span class="mi">2</span> <span class="o">+</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC85'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;invsteep&#39;</span><span class="o">:</span><span class="k">return</span> <span class="p">(</span><span class="nx">width</span><span class="o">-</span><span class="nx">i</span><span class="p">)</span><span class="o">/</span><span class="mi">2</span><span class="o">+</span><span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC86'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC87'><span class="p">};</span></div><div class='line' id='LC88'><br/></div><div class='line' id='LC89'><span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">corner</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC90'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// in 1.3+ we can fix mistakes with the ready state</span></div><div class='line' id='LC91'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">length</span> <span class="o">==</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC92'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$</span><span class="p">.</span><span class="nx">isReady</span> <span class="o">&amp;&amp;</span> <span class="k">this</span><span class="p">.</span><span class="nx">selector</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC93'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">s</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">selector</span><span class="p">,</span> <span class="nx">c</span> <span class="o">=</span> <span class="k">this</span><span class="p">.</span><span class="nx">context</span><span class="p">;</span></div><div class='line' id='LC94'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC95'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$</span><span class="p">(</span><span class="nx">s</span><span class="p">,</span><span class="nx">c</span><span class="p">).</span><span class="nx">corner</span><span class="p">(</span><span class="nx">options</span><span class="p">);</span></div><div class='line' id='LC96'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC97'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC98'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC99'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC100'><br/></div><div class='line' id='LC101'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">index</span><span class="p">){</span></div><div class='line' id='LC102'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">$this</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">),</span></div><div class='line' id='LC103'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// meta values override options</span></div><div class='line' id='LC104'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">o</span> <span class="o">=</span> <span class="p">[</span><span class="nx">$this</span><span class="p">.</span><span class="nx">attr</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">corner</span><span class="p">.</span><span class="nx">defaults</span><span class="p">.</span><span class="nx">metaAttr</span><span class="p">)</span> <span class="o">||</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="nx">options</span> <span class="o">||</span> <span class="s1">&#39;&#39;</span><span class="p">].</span><span class="nx">join</span><span class="p">(</span><span class="s1">&#39; &#39;</span><span class="p">).</span><span class="nx">toLowerCase</span><span class="p">(),</span></div><div class='line' id='LC105'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">keep</span> <span class="o">=</span> <span class="sr">/keep/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span>                       <span class="c1">// keep borders?</span></div><div class='line' id='LC106'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">cc</span> <span class="o">=</span> <span class="p">((</span><span class="nx">o</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="sr">/cc:(#[0-9a-f]+)/</span><span class="p">)</span><span class="o">||</span><span class="p">[])[</span><span class="mi">1</span><span class="p">]),</span>  <span class="c1">// corner color</span></div><div class='line' id='LC107'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">sc</span> <span class="o">=</span> <span class="p">((</span><span class="nx">o</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="sr">/sc:(#[0-9a-f]+)/</span><span class="p">)</span><span class="o">||</span><span class="p">[])[</span><span class="mi">1</span><span class="p">]),</span>  <span class="c1">// strip color</span></div><div class='line' id='LC108'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">width</span> <span class="o">=</span> <span class="nb">parseInt</span><span class="p">((</span><span class="nx">o</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="sr">/(\d+)px/</span><span class="p">)</span><span class="o">||</span><span class="p">[])[</span><span class="mi">1</span><span class="p">])</span> <span class="o">||</span> <span class="mi">10</span><span class="p">,</span> <span class="c1">// corner width</span></div><div class='line' id='LC109'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">re</span> <span class="o">=</span> <span class="sr">/round|bevelfold|bevel|notch|bite|cool|sharp|slide|jut|curl|tear|fray|wicked|sculpt|long|dog3|dog2|dogfold|dog|invsteep|steep/</span><span class="p">,</span></div><div class='line' id='LC110'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fx</span> <span class="o">=</span> <span class="p">((</span><span class="nx">o</span><span class="p">.</span><span class="nx">match</span><span class="p">(</span><span class="nx">re</span><span class="p">)</span><span class="o">||</span><span class="p">[</span><span class="s1">&#39;round&#39;</span><span class="p">])[</span><span class="mi">0</span><span class="p">]),</span></div><div class='line' id='LC111'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fold</span> <span class="o">=</span> <span class="sr">/dogfold|bevelfold/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span></div><div class='line' id='LC112'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">edges</span> <span class="o">=</span> <span class="p">{</span> <span class="nx">T</span><span class="o">:</span><span class="mi">0</span><span class="p">,</span> <span class="nx">B</span><span class="o">:</span><span class="mi">1</span> <span class="p">},</span></div><div class='line' id='LC113'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">opts</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC114'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">TL</span><span class="o">:</span>  <span class="sr">/top|tl|left/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span>       <span class="nx">TR</span><span class="o">:</span>  <span class="sr">/top|tr|right/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span></div><div class='line' id='LC115'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">BL</span><span class="o">:</span>  <span class="sr">/bottom|bl|left/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">),</span>    <span class="nx">BR</span><span class="o">:</span>  <span class="sr">/bottom|br|right/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">o</span><span class="p">)</span></div><div class='line' id='LC116'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC117'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// vars used in func later</span></div><div class='line' id='LC118'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">strip</span><span class="p">,</span> <span class="nx">pad</span><span class="p">,</span> <span class="nx">cssHeight</span><span class="p">,</span> <span class="nx">j</span><span class="p">,</span> <span class="nx">bot</span><span class="p">,</span> <span class="nx">d</span><span class="p">,</span> <span class="nx">ds</span><span class="p">,</span> <span class="nx">bw</span><span class="p">,</span> <span class="nx">i</span><span class="p">,</span> <span class="nx">w</span><span class="p">,</span> <span class="nx">e</span><span class="p">,</span> <span class="nx">c</span><span class="p">,</span> <span class="nx">common</span><span class="p">,</span> <span class="nx">$horz</span><span class="p">;</span></div><div class='line' id='LC119'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC120'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span> <span class="o">!</span><span class="nx">opts</span><span class="p">.</span><span class="nx">TL</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">opts</span><span class="p">.</span><span class="nx">TR</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">opts</span><span class="p">.</span><span class="nx">BL</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">opts</span><span class="p">.</span><span class="nx">BR</span> <span class="p">)</span></div><div class='line' id='LC121'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">opts</span> <span class="o">=</span> <span class="p">{</span> <span class="nx">TL</span><span class="o">:</span><span class="mi">1</span><span class="p">,</span> <span class="nx">TR</span><span class="o">:</span><span class="mi">1</span><span class="p">,</span> <span class="nx">BL</span><span class="o">:</span><span class="mi">1</span><span class="p">,</span> <span class="nx">BR</span><span class="o">:</span><span class="mi">1</span> <span class="p">};</span></div><div class='line' id='LC122'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC123'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// support native rounding</span></div><div class='line' id='LC124'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">corner</span><span class="p">.</span><span class="nx">defaults</span><span class="p">.</span><span class="nx">useNative</span> <span class="o">&amp;&amp;</span> <span class="nx">fx</span> <span class="o">==</span> <span class="s1">&#39;round&#39;</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">radius</span> <span class="o">||</span> <span class="nx">moz</span> <span class="o">||</span> <span class="nx">webkit</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">cc</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">sc</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC125'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">TL</span><span class="p">)</span></div><div class='line' id='LC126'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$this</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">radius</span> <span class="o">?</span> <span class="s1">&#39;border-top-left-radius&#39;</span> <span class="o">:</span> <span class="nx">moz</span> <span class="o">?</span> <span class="s1">&#39;-moz-border-radius-topleft&#39;</span> <span class="o">:</span> <span class="s1">&#39;-webkit-border-top-left-radius&#39;</span><span class="p">,</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">);</span></div><div class='line' id='LC127'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">TR</span><span class="p">)</span></div><div class='line' id='LC128'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$this</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">radius</span> <span class="o">?</span> <span class="s1">&#39;border-top-right-radius&#39;</span> <span class="o">:</span> <span class="nx">moz</span> <span class="o">?</span> <span class="s1">&#39;-moz-border-radius-topright&#39;</span> <span class="o">:</span> <span class="s1">&#39;-webkit-border-top-right-radius&#39;</span><span class="p">,</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">);</span></div><div class='line' id='LC129'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">BL</span><span class="p">)</span></div><div class='line' id='LC130'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$this</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">radius</span> <span class="o">?</span> <span class="s1">&#39;border-bottom-left-radius&#39;</span> <span class="o">:</span> <span class="nx">moz</span> <span class="o">?</span> <span class="s1">&#39;-moz-border-radius-bottomleft&#39;</span> <span class="o">:</span> <span class="s1">&#39;-webkit-border-bottom-left-radius&#39;</span><span class="p">,</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">);</span></div><div class='line' id='LC131'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">BR</span><span class="p">)</span></div><div class='line' id='LC132'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$this</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">radius</span> <span class="o">?</span> <span class="s1">&#39;border-bottom-right-radius&#39;</span> <span class="o">:</span> <span class="nx">moz</span> <span class="o">?</span> <span class="s1">&#39;-moz-border-radius-bottomright&#39;</span> <span class="o">:</span> <span class="s1">&#39;-webkit-border-bottom-right-radius&#39;</span><span class="p">,</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">);</span></div><div class='line' id='LC133'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC134'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC135'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC136'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">strip</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">);</span></div><div class='line' id='LC137'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$</span><span class="p">(</span><span class="nx">strip</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span></div><div class='line' id='LC138'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">overflow</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">,</span></div><div class='line' id='LC139'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">height</span><span class="o">:</span> <span class="s1">&#39;1px&#39;</span><span class="p">,</span></div><div class='line' id='LC140'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">minHeight</span><span class="o">:</span> <span class="s1">&#39;1px&#39;</span><span class="p">,</span></div><div class='line' id='LC141'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">fontSize</span><span class="o">:</span> <span class="s1">&#39;1px&#39;</span><span class="p">,</span></div><div class='line' id='LC142'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">backgroundColor</span><span class="o">:</span> <span class="nx">sc</span> <span class="o">||</span> <span class="s1">&#39;transparent&#39;</span><span class="p">,</span></div><div class='line' id='LC143'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">borderStyle</span><span class="o">:</span> <span class="s1">&#39;solid&#39;</span></div><div class='line' id='LC144'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC145'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC146'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">pad</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC147'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">T</span><span class="o">:</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;paddingTop&#39;</span><span class="p">))</span><span class="o">||</span><span class="mi">0</span><span class="p">,</span>     <span class="nx">R</span><span class="o">:</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;paddingRight&#39;</span><span class="p">))</span><span class="o">||</span><span class="mi">0</span><span class="p">,</span></div><div class='line' id='LC148'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">B</span><span class="o">:</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;paddingBottom&#39;</span><span class="p">))</span><span class="o">||</span><span class="mi">0</span><span class="p">,</span>  <span class="nx">L</span><span class="o">:</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;paddingLeft&#39;</span><span class="p">))</span><span class="o">||</span><span class="mi">0</span></div><div class='line' id='LC149'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">};</span></div><div class='line' id='LC150'><br/></div><div class='line' id='LC151'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">zoom</span> <span class="o">!=</span> <span class="kc">undefined</span><span class="p">)</span> <span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">zoom</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span> <span class="c1">// force &#39;hasLayout&#39; in IE</span></div><div class='line' id='LC152'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">keep</span><span class="p">)</span> <span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">border</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span></div><div class='line' id='LC153'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">strip</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">borderColor</span> <span class="o">=</span> <span class="nx">cc</span> <span class="o">||</span> <span class="nx">gpc</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">parentNode</span><span class="p">);</span></div><div class='line' id='LC154'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">cssHeight</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">outerHeight</span><span class="p">();</span></div><div class='line' id='LC155'><br/></div><div class='line' id='LC156'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="nx">j</span> <span class="k">in</span> <span class="nx">edges</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC157'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bot</span> <span class="o">=</span> <span class="nx">edges</span><span class="p">[</span><span class="nx">j</span><span class="p">];</span></div><div class='line' id='LC158'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// only add stips if needed</span></div><div class='line' id='LC159'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">((</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">BL</span> <span class="o">||</span> <span class="nx">opts</span><span class="p">.</span><span class="nx">BR</span><span class="p">))</span> <span class="o">||</span> <span class="p">(</span><span class="o">!</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">opts</span><span class="p">.</span><span class="nx">TL</span> <span class="o">||</span> <span class="nx">opts</span><span class="p">.</span><span class="nx">TR</span><span class="p">)))</span> <span class="p">{</span></div><div class='line' id='LC160'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">strip</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">borderStyle</span> <span class="o">=</span> <span class="s1">&#39;none &#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">opts</span><span class="p">[</span><span class="nx">j</span><span class="o">+</span><span class="s1">&#39;R&#39;</span><span class="p">]</span><span class="o">?</span><span class="s1">&#39;solid&#39;</span><span class="o">:</span><span class="s1">&#39;none&#39;</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39; none &#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">opts</span><span class="p">[</span><span class="nx">j</span><span class="o">+</span><span class="s1">&#39;L&#39;</span><span class="p">]</span><span class="o">?</span><span class="s1">&#39;solid&#39;</span><span class="o">:</span><span class="s1">&#39;none&#39;</span><span class="p">);</span></div><div class='line' id='LC161'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;div&#39;</span><span class="p">);</span></div><div class='line' id='LC162'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$</span><span class="p">(</span><span class="nx">d</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="s1">&#39;jquery-corner&#39;</span><span class="p">);</span></div><div class='line' id='LC163'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span> <span class="o">=</span> <span class="nx">d</span><span class="p">.</span><span class="nx">style</span><span class="p">;</span></div><div class='line' id='LC164'><br/></div><div class='line' id='LC165'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bot</span> <span class="o">?</span> <span class="k">this</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">d</span><span class="p">)</span> <span class="o">:</span> <span class="k">this</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">d</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">firstChild</span><span class="p">);</span></div><div class='line' id='LC166'><br/></div><div class='line' id='LC167'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="nx">cssHeight</span> <span class="o">!=</span> <span class="s1">&#39;auto&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC168'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;position&#39;</span><span class="p">)</span> <span class="o">==</span> <span class="s1">&#39;static&#39;</span><span class="p">)</span></div><div class='line' id='LC169'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="s1">&#39;relative&#39;</span><span class="p">;</span></div><div class='line' id='LC170'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="s1">&#39;absolute&#39;</span><span class="p">;</span></div><div class='line' id='LC171'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">bottom</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">left</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">padding</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">margin</span> <span class="o">=</span> <span class="s1">&#39;0&#39;</span><span class="p">;</span></div><div class='line' id='LC172'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">expr</span><span class="p">)</span></div><div class='line' id='LC173'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">setExpression</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">,</span> <span class="s1">&#39;this.parentNode.offsetWidth&#39;</span><span class="p">);</span></div><div class='line' id='LC174'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span></div><div class='line' id='LC175'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="s1">&#39;100%&#39;</span><span class="p">;</span></div><div class='line' id='LC176'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC177'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="nx">$</span><span class="p">.</span><span class="nx">browser</span><span class="p">.</span><span class="nx">msie</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC178'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;position&#39;</span><span class="p">)</span> <span class="o">==</span> <span class="s1">&#39;static&#39;</span><span class="p">)</span></div><div class='line' id='LC179'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="s1">&#39;relative&#39;</span><span class="p">;</span></div><div class='line' id='LC180'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="s1">&#39;absolute&#39;</span><span class="p">;</span></div><div class='line' id='LC181'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">top</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">left</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">right</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">padding</span> <span class="o">=</span> <span class="nx">ds</span><span class="p">.</span><span class="nx">margin</span> <span class="o">=</span> <span class="s1">&#39;0&#39;</span><span class="p">;</span></div><div class='line' id='LC182'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC183'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c1">// fix ie6 problem when blocked element has a border width</span></div><div class='line' id='LC184'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">expr</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC185'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bw</span> <span class="o">=</span> <span class="nx">sz</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;borderLeftWidth&#39;</span><span class="p">)</span> <span class="o">+</span> <span class="nx">sz</span><span class="p">(</span><span class="k">this</span><span class="p">,</span><span class="s1">&#39;borderRightWidth&#39;</span><span class="p">);</span></div><div class='line' id='LC186'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">setExpression</span><span class="p">(</span><span class="s1">&#39;width&#39;</span><span class="p">,</span> <span class="s1">&#39;this.parentNode.offsetWidth - &#39;</span><span class="o">+</span><span class="nx">bw</span><span class="o">+</span><span class="s1">&#39;+ &quot;px&quot;&#39;</span><span class="p">);</span></div><div class='line' id='LC187'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC188'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span></div><div class='line' id='LC189'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="s1">&#39;100%&#39;</span><span class="p">;</span></div><div class='line' id='LC190'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC191'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC192'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="s1">&#39;relative&#39;</span><span class="p">;</span></div><div class='line' id='LC193'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">ds</span><span class="p">.</span><span class="nx">margin</span> <span class="o">=</span> <span class="o">!</span><span class="nx">bot</span> <span class="o">?</span> <span class="s1">&#39;-&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">T</span><span class="o">+</span><span class="s1">&#39;px -&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">R</span><span class="o">+</span><span class="s1">&#39;px &#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">pad</span><span class="p">.</span><span class="nx">T</span><span class="o">-</span><span class="nx">width</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39;px -&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">L</span><span class="o">+</span><span class="s1">&#39;px&#39;</span> <span class="o">:</span> </div><div class='line' id='LC194'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">(</span><span class="nx">pad</span><span class="p">.</span><span class="nx">B</span><span class="o">-</span><span class="nx">width</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39;px -&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">R</span><span class="o">+</span><span class="s1">&#39;px -&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">B</span><span class="o">+</span><span class="s1">&#39;px -&#39;</span><span class="o">+</span><span class="nx">pad</span><span class="p">.</span><span class="nx">L</span><span class="o">+</span><span class="s1">&#39;px&#39;</span><span class="p">;</span>                </div><div class='line' id='LC195'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC196'><br/></div><div class='line' id='LC197'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="nx">i</span><span class="o">=</span><span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">width</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC198'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">w</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="nx">getWidth</span><span class="p">(</span><span class="nx">fx</span><span class="p">,</span><span class="nx">i</span><span class="p">,</span> <span class="nx">width</span><span class="p">));</span></div><div class='line' id='LC199'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">e</span> <span class="o">=</span> <span class="nx">strip</span><span class="p">.</span><span class="nx">cloneNode</span><span class="p">(</span><span class="kc">false</span><span class="p">);</span></div><div class='line' id='LC200'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">e</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">borderWidth</span> <span class="o">=</span> <span class="s1">&#39;0 &#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">opts</span><span class="p">[</span><span class="nx">j</span><span class="o">+</span><span class="s1">&#39;R&#39;</span><span class="p">]</span><span class="o">?</span><span class="nx">w</span><span class="o">:</span><span class="mi">0</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39;px 0 &#39;</span><span class="o">+</span><span class="p">(</span><span class="nx">opts</span><span class="p">[</span><span class="nx">j</span><span class="o">+</span><span class="s1">&#39;L&#39;</span><span class="p">]</span><span class="o">?</span><span class="nx">w</span><span class="o">:</span><span class="mi">0</span><span class="p">)</span><span class="o">+</span><span class="s1">&#39;px&#39;</span><span class="p">;</span></div><div class='line' id='LC201'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bot</span> <span class="o">?</span> <span class="nx">d</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="o">:</span> <span class="nx">d</span><span class="p">.</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">e</span><span class="p">,</span> <span class="nx">d</span><span class="p">.</span><span class="nx">firstChild</span><span class="p">);</span></div><div class='line' id='LC202'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC203'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC204'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">fold</span> <span class="o">&amp;&amp;</span> <span class="nx">$</span><span class="p">.</span><span class="nx">support</span><span class="p">.</span><span class="nx">boxModel</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC205'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="nx">noBottomFold</span><span class="p">)</span> <span class="k">continue</span><span class="p">;</span></div><div class='line' id='LC206'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">for</span> <span class="p">(</span><span class="nx">c</span> <span class="k">in</span> <span class="nx">opts</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC207'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">opts</span><span class="p">[</span><span class="nx">c</span><span class="p">])</span> <span class="k">continue</span><span class="p">;</span></div><div class='line' id='LC208'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">c</span> <span class="o">==</span> <span class="s1">&#39;TL&#39;</span> <span class="o">||</span> <span class="nx">c</span> <span class="o">==</span> <span class="s1">&#39;TR&#39;</span><span class="p">))</span> <span class="k">continue</span><span class="p">;</span></div><div class='line' id='LC209'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">bot</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">c</span> <span class="o">==</span> <span class="s1">&#39;BL&#39;</span> <span class="o">||</span> <span class="nx">c</span> <span class="o">==</span> <span class="s1">&#39;BR&#39;</span><span class="p">))</span> <span class="k">continue</span><span class="p">;</span></div><div class='line' id='LC210'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC211'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">common</span> <span class="o">=</span> <span class="p">{</span> <span class="nx">position</span><span class="o">:</span> <span class="s1">&#39;absolute&#39;</span><span class="p">,</span> <span class="nx">border</span><span class="o">:</span> <span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="nx">margin</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">padding</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">overflow</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">,</span> <span class="nx">backgroundColor</span><span class="o">:</span> <span class="nx">strip</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">borderColor</span> <span class="p">};</span></div><div class='line' id='LC212'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$horz</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;&lt;div/&gt;&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="nx">common</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span> <span class="nx">width</span><span class="o">:</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">,</span> <span class="nx">height</span><span class="o">:</span> <span class="s1">&#39;1px&#39;</span> <span class="p">});</span></div><div class='line' id='LC213'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">switch</span><span class="p">(</span><span class="nx">c</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC214'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;TL&#39;</span><span class="o">:</span> <span class="nx">$horz</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">bottom</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">left</span><span class="o">:</span> <span class="mi">0</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC215'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;TR&#39;</span><span class="o">:</span> <span class="nx">$horz</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">bottom</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">right</span><span class="o">:</span> <span class="mi">0</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC216'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;BL&#39;</span><span class="o">:</span> <span class="nx">$horz</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">top</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">left</span><span class="o">:</span> <span class="mi">0</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC217'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;BR&#39;</span><span class="o">:</span> <span class="nx">$horz</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">top</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">right</span><span class="o">:</span> <span class="mi">0</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC218'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC219'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">$horz</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span></div><div class='line' id='LC220'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC221'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">$vert</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;&lt;div/&gt;&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">(</span><span class="nx">common</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span> <span class="nx">top</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">bottom</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">width</span><span class="o">:</span> <span class="s1">&#39;1px&#39;</span><span class="p">,</span> <span class="nx">height</span><span class="o">:</span> <span class="nx">width</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span> <span class="p">});</span></div><div class='line' id='LC222'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">switch</span><span class="p">(</span><span class="nx">c</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC223'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;TL&#39;</span><span class="o">:</span> <span class="nx">$vert</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">left</span><span class="o">:</span> <span class="nx">width</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC224'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;TR&#39;</span><span class="o">:</span> <span class="nx">$vert</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">right</span><span class="o">:</span> <span class="nx">width</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC225'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;BL&#39;</span><span class="o">:</span> <span class="nx">$vert</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">left</span><span class="o">:</span> <span class="nx">width</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC226'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">case</span> <span class="s1">&#39;BR&#39;</span><span class="o">:</span> <span class="nx">$vert</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span> <span class="nx">right</span><span class="o">:</span> <span class="nx">width</span> <span class="p">});</span> <span class="k">break</span><span class="p">;</span></div><div class='line' id='LC227'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC228'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">d</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">$vert</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span></div><div class='line' id='LC229'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC230'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC231'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC232'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC233'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC234'><span class="p">};</span></div><div class='line' id='LC235'><br/></div><div class='line' id='LC236'><span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">uncorner</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span> </div><div class='line' id='LC237'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span> <span class="p">(</span><span class="nx">radius</span> <span class="o">||</span> <span class="nx">moz</span> <span class="o">||</span> <span class="nx">webkit</span><span class="p">)</span></div><div class='line' id='LC238'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">this</span><span class="p">.</span><span class="nx">css</span><span class="p">(</span><span class="nx">radius</span> <span class="o">?</span> <span class="s1">&#39;border-radius&#39;</span> <span class="o">:</span> <span class="nx">moz</span> <span class="o">?</span> <span class="s1">&#39;-moz-border-radius&#39;</span> <span class="o">:</span> <span class="s1">&#39;-webkit-border-radius&#39;</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC239'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">$</span><span class="p">(</span><span class="s1">&#39;div.jquery-corner&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">).</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC240'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC241'><span class="p">};</span></div><div class='line' id='LC242'><br/></div><div class='line' id='LC243'><span class="c1">// expose options</span></div><div class='line' id='LC244'><span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">.</span><span class="nx">corner</span><span class="p">.</span><span class="nx">defaults</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC245'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">useNative</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span> <span class="c1">// true if plugin should attempt to use native browser support for border radius rounding</span></div><div class='line' id='LC246'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">metaAttr</span><span class="o">:</span>  <span class="s1">&#39;data-corner&#39;</span> <span class="c1">// name of meta attribute to use for options</span></div><div class='line' id='LC247'><span class="p">};</span></div><div class='line' id='LC248'>&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='line' id='LC249'><span class="p">})(</span><span class="nx">jQuery</span><span class="p">);</span></div><div class='line' id='LC250'><br/></div></pre></div>
              
            
          </td>
        </tr>
      </table>
    
  </div>


          </div>
        </div>
      </div>
    </div>
  

  </div>


<div class="frame frame-loading" style="display:none;">
  <img src="https://a248.e.akamai.net/assets.github.com/images/modules/ajax/big_spinner_336699.gif" height="32" width="32">
</div>

    </div>
  
      
    </div>

    <!--**************
     FOOTER
     **************-->
    <div id="footer" >
      <div class="upper_footer">
        <div class="site" class="clearfix">

        <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
        <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

        <ul class="footer_nav">
          <h4>GitHub</h4>
          <li><a href="https://github.com/about">About</a></li>
          <li><a href="https://github.com/blog">Blog</a></li>
          <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
          <li><a href="https://github.com/training">Training</a></li>
          <li><a href="http://status.github.com/">Site Status</a></li>
        </ul>

        <ul class="footer_nav">
          <h4>Tools</h4>
          <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
          <li><a href="https://gist.github.com">Gist</a></li>
          <li><a href="http://fi.github.com/">Enterprise Install</a></li>
          <li><a href="http://jobs.github.com/">Job Board</a></li>
        </ul>

        <ul class="footer_nav">
          <h4>Extras</h4>
          <li><a href="http://shop.github.com/">Shop</a></li>
          <li><a href="http://octodex.github.com/">The Octodex</a></li>
        </ul>

        <ul class="footer_nav">
          <h4>Documentation</h4>
          <li><a href="http://help.github.com/">GitHub Help</a></li>
          <li><a href="http://developer.github.com/">Developer API</a></li>
          <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
          <li><a href="http://pages.github.com/">GitHub Pages</a></li>
        </ul>

        </div><!-- /.site -->
      </div><!-- /.upper_footer -->

      <div class="lower_footer">
        <div class="site" class="clearfix">

        <!--[if IE]><div id="legal_ie"><![endif]-->
        <![if !IE]><div id="legal"><![endif]>
              <ul>
                <li><a href="https://github.com/site/terms">Terms of Service</a></li>
                <li><a href="https://github.com/site/privacy">Privacy</a></li>
                <li><a href="https://github.com/security">Security</a></li>
              </ul>

              <p>&copy; 2011 <span id="_rrt" title="0.07380s from fe4.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
            </div><!-- /#legal or /#legal_ie-->

          
          <div class="sponsor">
              <a href="http://www.rackspace.com" class="logo">
                <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspace_logo.png?v2" width="38" />
              </a>
              Powered by the <a href="http://www.rackspace.com ">Dedicated
              Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
              Computing</a> of Rackspace Hosting<span>&reg;</span>
          </div>
          
        </div><!-- /.site -->
      </div><!-- /.lower_footer -->
    </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selected down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selected up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>t</dt>
        <dd>Open tree</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>p</dt>
        <dd>Open parent</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selected down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selected up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selected down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selected up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle select target</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column middle">
        <dl class="keyboard-mappings">
          <dt>I</dt>
          <dd>Mark selected as read</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>U</dt>
          <dd>Mark selected as unread</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>e</dt>
          <dd>Close selected</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Remove selected from view</dd>
        </dl>
      </div><!-- /.column.middle -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:
> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>
    

    <!--[if IE 8]>
    <script type="text/javascript" charset="utf-8">
      $(document.body).addClass("ie8")
    </script>
    <![endif]-->

    <!--[if IE 7]>
    <script type="text/javascript" charset="utf-8">
      $(document.body).addClass("ie7")
    </script>
    <![endif]-->

    
    
    
    <script type="text/javascript">(function(){var d=document;var e=d.createElement("script");e.async=true;e.src="https://d1ros97qkrwjf5.cloudfront.net/14/eum/rum.js	";e.type="text/javascript";var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(e,s);})();NREUMQ.push(["nrf2","beacon-1.newrelic.com","2f94e4d8c2",64799,"dw1bEBZcX1RWRhoEClsAGhcMXEQ=",0.0,68,new Date().getTime()])</script>
  </body>
</html>

