import useSWR from "swr";

export default function Ingredient( {recipeId} ) {
    const { data: ingredients, isLoading } = useSWR(`/api/recipes/${recipeId}/ingredient`, fetcher);
    console.log(ingredients)
    
    if (isLoading) {
        return <span className="loading loading-dots loading-sm"></span>
    }

   

    return (
      
        <div className={'flex flex-col justify-start items-start mt-10'}>
            {
                ingredients.map((instruction, index) => (
                    <div key={index} className={'mb-8'}>
                        <p className={'text-start'}> {instruction.quantity} {instruction.unit} de {instruction.name}</p>
                       
                    </div>
                ))

            }
        </div>
    )
}


function fetcher(url) {
    return fetch(`http://localhost:3000${url}`).then((r) => r.json());
}
