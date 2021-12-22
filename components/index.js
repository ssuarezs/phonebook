
export const Filter = ({value, handle}) => 
    <form>
      <div>
        filter shown with 
        <input value={value} onChange={handle}/>
      </div>
    </form>

export const PersonForm = ({handleSubmit, newName, handleName, newNumber, handleNumber}) => 
    <form onSubmit={handleSubmit}>
      <div>
        name: 
        <input value={newName} onChange={handleName}/>
      </div>
      <div>
        number: 
        <input value={newNumber} onChange={handleNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

export const List = ({ filter, persons, filText, del }) => 
    filText  
      ? filter.map(p => 
        <div key={p.id}>
          {p.id} {p.name} {p.number}
          <button onClick={()=>del(p.id, p.name)}>delete</button>
        </div>)
      : persons.map(p => 
        <div key={p.id}>
          {p.id} {p.name} {p.number}
          <button onClick={()=>del(p.id, p.name)}>delete</button>
        </div>
      )
