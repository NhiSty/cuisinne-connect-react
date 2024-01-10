import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {getRecipesByCalories} from "../../api/recipes.js";
import {useMutation} from "@tanstack/react-query";
import {useRecipesByCaloriesContext} from "../RecipesByCaloriesContext.jsx";

export default function SearchByCalorie() {
    const navigate = useNavigate();
  const [calories, setCalories] = useState("");
  const { setRecipesByCalories, setIsLoading } = useRecipesByCaloriesContext();

  const searchRecipes = async (calories) => {
      return await getRecipesByCalories(calories)
  }

    const mutation = useMutation({
        mutationFn: searchRecipes
    });

    const handleSubmit =  async (event) => {
        setIsLoading(true);
        event.preventDefault();
        if (!calories) {
            return;
        }

        try {
            navigate(`/?search-by-calories=${calories}`);
            const recipes = await mutation.mutateAsync(calories);
            setRecipesByCalories(recipes);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false);
        }
    }

    const onChange = (event) => {
        setCalories(event.target.value);
    }

  return (
      <div className="flex flex-col gap-3 px-4 py-2">
        <form
            className="w-full"
            onSubmit={handleSubmit}
        >
          <div className="form-control w-full">
            <select
                value={calories}
                onChange={onChange}
                className="select w-full input bg-white input-bordered md:w-auto h-9">
              <option disabled selected value={""}>Choisir le nombre de calories</option>
              <option value={'50-100'}>50-100 kcal</option>
              <option value={'100-200'}>100-200 kcal</option>
              <option value={'200-300'}>200-300 kcal</option>
              <option value={'300-400'}>300-400 kcal</option>
              <option value={'400-500'}>400-500 kcal</option>
              <option value={'500-600'}>500-600 kcal</option>
              <option value={'600-3000'}>+600 kcal</option>
            </select>
          </div>
          <div className={'mt-3 flex justify-end'}>
            <button type={'submit'} className="btn btn-primary">Rechercher</button>
          </div>
        </form>
      </div>
  );
}
