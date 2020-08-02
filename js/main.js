$('document').ready(function(){
    $('#searchUser').on('keyup',function(e){
        let username = e.target.value;

        //make github api requests
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'c08688b35fc5ef9628ee',
                client_secret:'600d3bde07bba0ad7f4dc1c794e7fbd7256da4db'
            }
        }).done(function(user){
          
          $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'c08688b35fc5ef9628ee',
                client_secret:'600d3bde07bba0ad7f4dc1c794e7fbd7256da4db',
                sort: 'created: asc',
                per_page: 3
            }
          }).done(function(repos){
            $.each(repos, function(index, repo){
              $('#repos').append(`
              
              <div class="card card-body bg-light">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong> : ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                    <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                  <a href="${repo.html_url}" class="btn btn-primary" target="_blank">Repo Page</a>
                  </div>
                </div>
              </div>
              
              `);
            });
          });

            $('#profile').html(`
            <div class="card">
            <div class="card-header">
             ${user.name}
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                    <img class="thumbnail avatar" src="${user.avatar_url}"></img>
                    <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Public Followers: ${user.followers}</span>
                <span class="badge badge-danger">Public Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/Blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
            `);
        });
    });
});