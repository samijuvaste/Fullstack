import { useState } from "react"
import { useMutation } from "@apollo/client"
import Select from 'react-select'

import { EDIT_BORN } from "../queries"

const BirthForm = ({ show, result }) => {
    const [born, setBorn] = useState('')
    const [selectedName, setSelectedName] = useState(null)

    const [ changeBorn ] = useMutation(EDIT_BORN)

    if (!show || result.loading || !result.data) {
        return null
    }

    const options = result.data.allAuthors.map(author => ({
        value: author.name,
        label: author.name
    }))

    const submit = async (event) => {
        event.preventDefault()

        changeBorn({ variables: { name: selectedName.value, born: parseInt(born) }})

        setSelectedName(null)
        setBorn('')
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <Select
                    value={selectedName}
                    onChange={setSelectedName}
                    options={options}
                />
                born
                <input
                    type="number"
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                <br/>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthForm