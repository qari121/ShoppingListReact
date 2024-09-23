
import Header  from './Header';
import Content  from './Content';
import Footer from './Footer'
import { useState,useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem  from './SearchItem';
import apiRequest from './apiRequest';
function App() {
          const API_URL='http://localhost:3500/items';

          const [items,setItems]=useState([]);
          const [search,setSearch]=useState('')
          const [newItem,setNewItem]=useState('')
          const [fetchError,setFectError]=useState(null)
          const [isLoading,setIsLoading]=useState(true)
         useEffect(()=>{


          const fetchItems= async () =>{
            try{
              const response=await fetch(API_URL);
              if(!response.ok ) throw Error('Did Not Receive Expected Data.')
              const listIems=await response.json();

              console.log(listIems);
              setItems(listIems);
              setFectError(null)
            } catch (err){
              console.log(err.stack)
              setFectError(err.message)
            }finally{
              setIsLoading(false)
            }
          }
          
          setTimeout(() => {
            (async () => await fetchItems())();
          }, 2000);
          
         },[] )
        
         
          const addItem=async(item) => {
                const id= items.length ? items[items.length - 1].id +1 : 1;
                const myNewItem={ id, checked:false, item }
                const listItems=[...items, myNewItem]
                setItems(listItems)

                const postOptions={
                  method:'POST',
                  headers:{
                    'Content-Type' : 'application/json'
                  },
                  body:JSON.stringify(myNewItem)
                  
                }
                const result= await apiRequest(API_URL,postOptions)
                if(result) setFectError(result)
          }
          const handleCheck=async(id)=>{
              const listItems=items.map((item) => item.id ===id? {...item,
                  checked:!item.checked  } : item);
                  setItems(listItems);
             
              const myItem=listItems.filter(item => item.id===id);
              const updateOptions={
                method:'PATCH',
                headers:{
                  'Content-Type':'application/json',
                },
                body: JSON.stringify({checked:myItem[0].checked})
              };
              const reqURL=`${API_URL}/${id}`
              const result= await apiRequest(reqURL,updateOptions)
              if(result) setFectError(result)
          }
          const handleDelete=async(id)=>{
              const listItems=items.filter((item) => item.id !==id);
              setItems(listItems);

              const deleteOptions={
                method:'Delete',
               
               // body: JSON.stringify({checked:myItem[0].checked})
              };
              const reqURL=`${API_URL}/${id}`
              const result= await apiRequest(reqURL,deleteOptions)
              if(result) setFectError(result)
          }


          const handleSubmit=(e)=>{
            e.preventDefault();
            if(!newItem) return;
            const exists = items.some(item => item.item === newItem);
            if (exists) return;
            addItem(newItem)
            setNewItem('')
          }
  
  return (
    <div className="App">
     <Header title="Groceries"/>
    
     <AddItem
     newItem={newItem}
     setNewItem={setNewItem}
     handleSubmit={handleSubmit} 
     />
      <SearchItem 
     search={search}
     setSearch={setSearch}
     />
    <main>
      {isLoading && <p>Loading Content...</p> }
     {fetchError && <p style={{color:'red'}}>{`Error:${fetchError}`}
     </p>}
     {! fetchError &&  !isLoading && <Content
        items={items.filter (item => ((item.item).toLowerCase()).includes
        (search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        />}
    </main>
     <Footer length={items.length}/>
    </div>
  );
}

export default App;
