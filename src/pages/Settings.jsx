import { useMutation, useQuery } from "@tanstack/react-query";
import { SaveIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { queryClient } from "../api/http";
import { fetchUserSettings, updateUserSettings } from "../api/user";
import { TagInput } from "../components/TagInput";

export default function Settings() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["user", "settings"],
    queryFn: fetchUserSettings,
  });

  const { mutateAsync: updatePreferences } = useMutation({
    mutationFn: async ({ diets, allergies, preferences }) => {
      await updateUserSettings(diets, allergies, preferences);
      await queryClient.invalidateQueries(["user", "settings"]);
    },
  });

  const { handleSubmit, watch, setValue } = useForm();

  const onFormSubmit = useCallback(
      async (data) => {
        await updatePreferences(data);
      },
      [updatePreferences]
  );

  useEffect(() => {
    if (!isPending && !isError) {
      setValue("diets", data.diets);
      setValue("allergies", data.allergies);
      setValue("preferences", data.preferences);
    }
  }, [data]);

  if (isPending) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-2xl">{error.message}</span>
        </div>
    );
  }

  return (
      <form className="m-8" onSubmit={handleSubmit(onFormSubmit)}>
        <header className="mb-10 flex flex-row">
          <h2 className="text-2xl flex-1">Préférences</h2>
          <button className="btn btn-secondary" type="submit">
            <SaveIcon className="w-5 h-5 mr-2" />
            Enregistrer
          </button>
        </header>

        <div className="grid grid-cols-2 gap-8">
          <div className="card shadow-xl rounded-2xl bg-base-100">
            <div className="card-body">
              <h3 className="card-title">Régime alimentaire</h3>

              <div className="form-control">
                <label htmlFor="diets" className="label label-text">
                  Végétarien, sans sucre, sans sel, flexitarien, etc.
                </label>
                <TagInput
                    tags={watch("diets")}
                    id="diets"
                    onChange={(value) => setValue("diets", value)}
                    name="diets"
                    placeholder="Régime alimentaire"
                />
              </div>
            </div>
          </div>

          <div className="card shadow-xl rounded-2xl bg-base-100">
            <div className="card-body">
              <h3 className="card-title">Allergies</h3>

              <div className="form-control">
                <label htmlFor="allergies" className="label label-text">
                  Allergies
                </label>
                <TagInput
                    tags={watch("allergies")}
                    id="allergies"
                    onChange={(value) => setValue("allergies", value)}
                    name="allergies"
                    placeholder="Allergies"
                />
              </div>
            </div>
          </div>

          <div className="card shadow-xl rounded-2xl bg-base-100">
            <div className="card-body">
              <h3 className="card-title">Préférences</h3>

              <div className="form-control">
                <label htmlFor="preferences" className="label label-text">
                  Préférences (chorizos, fruits rouge, etc.)
                </label>
                <TagInput
                    tags={watch("preferences")}
                    id="preferences"
                    onChange={(value) => setValue("preferences", value)}
                    name="preferences"
                    placeholder="Préférences"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
  );
}
