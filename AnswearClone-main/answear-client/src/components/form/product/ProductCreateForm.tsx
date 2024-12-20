import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import ProductCreateVariantsForm from "components/form/product/ProductCreateVariantsForm.tsx";
import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { ProductCreateSchema, ProductCreateSchemaType } from "interfaces/zod/product.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "services/category.ts";
import { useCreateProductMutation } from "services/product.ts";

const ProductCreateForm = () => {
    const { data: categories } = useGetCategoriesQuery();
    const navigate = useNavigate();
    const [createProduct, { isLoading: createProductIsLoading }] = useCreateProductMutation();

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm<ProductCreateSchemaType>({ resolver: zodResolver(ProductCreateSchema) });

    const { fields, append, remove } = useFieldArray({ control, name: "variations" });

    const onSubmit = async (data: ProductCreateSchemaType) => {
        try {
            console.log(data);
            // @ts-expect-error ts-conflict
            await createProduct(data).unwrap();
            navigate("/admin/products/list");
            toast.success("Товар успішно створено", toastOptions);
        } catch (error) {
            toast.error(`Помилка під час створення товару`, toastOptions);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 border-2 border-[#dbdce0] p-8">
            <div>
                <Label htmlFor="name">Назва товару*</Label>
                <Input placeholder="наприклад: Джинси BOSS" type="text" id="name" {...register("name")} />
                {errors.name && <Attention>{errors.name.message}</Attention>}
            </div>
            <div>
                <Label htmlFor="description">Опис товару*</Label>
                <Input
                    placeholder="наприклад: Джинси із колекції BOSS фасону..."
                    type="text"
                    id="description"
                    {...register("description")}
                />
                {errors.description && <Attention>{errors.description.message}</Attention>}
            </div>

            <div>
                <Label htmlFor="categoryId">Категорія*</Label>
                <Select defaultValue="" id="categoryId" {...register("categoryId")}>
                    <Option disabled value="">
                        Виберіть категорію
                    </Option>
                    {categories?.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {`${category.name} ${category.parent ? `- ${category.parent.name}` : ""} (${category.targetGroup.name})`}
                        </Option>
                    ))}
                </Select>
                {errors.categoryId && <Attention>{errors.categoryId.message}</Attention>}
            </div>

            <div>
                <Label>Варіанти товару*</Label>
                {fields.map((item, index) => (
                    <ProductCreateVariantsForm
                        category={categories?.find((category) => category.id == watch("categoryId"))}
                        setValue={setValue}
                        register={register}
                        errors={errors}
                        key={item.id}
                        index={index}
                        remove={remove}
                        watch={watch}
                    />
                ))}

                {/*@ts-ignore*/}
                <Button type="button" onClick={() => append({})}>
                    Додати значення
                </Button>
            </div>

            <div className="flex items-center justify-center">
                <Button size="full">{createProductIsLoading ? <IconLoader2 className="animate-spin" /> : "Додати товар"}</Button>
            </div>
        </form>
    );
};

export default ProductCreateForm;
