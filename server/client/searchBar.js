import React from 'react'

function searchBar(props) {

    function onSearch(){
        let searchValue = document.getElementById('search_box_id').value;
        console.log("searching with ",searchValue);
        props.setSearch(searchValue);
    }
    document.getElementById("search_button") && document.getElementById("search_button").addEventListener("click", function(event){
        event.preventDefault()
      });
      function checkInput(){
        let searchValue = document.getElementById('search_box_id').value;
        if(searchValue == "")
        {
        console.log("no search value, fetching top news");
        props.setSearch(searchValue);
        }
      }
    return (
  <>
 <form class="example" style={{"margin":"auto","max-width":"300px"}}>
  <input type="text" placeholder="Search.." name="search" id="search_box_id" onChange={checkInput} />
  <button id="search_button" onClick={onSearch}><i class="fa fa-search"></i></button>
</form>
</>
    )
}

export default searchBar
