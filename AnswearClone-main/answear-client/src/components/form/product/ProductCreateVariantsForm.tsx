import { Attention, Button, Input, Label, Option, Select } from "components/ui";
import FileInputMultiple from "components/ui/FileInputMultiple.tsx";
import { ICategory } from "interfaces/category";
import { ProductCreateSchemaType } from "interfaces/zod/product.ts";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useGetDiscountsQuery } from "services/discount.ts";
import { useGetFiltersQuery } from "services/filter.ts";
import { handleFileChange } from "utils/handleFileChange.ts";

import React, { useEffect, useRef, useState } from "react";

interface ProductCreateVariantsFormProps {
    index: number;
    register: UseFormRegister<any>;
    errors: FieldErrors<ProductCreateSchemaType>;
    remove: (index: number) => void;
    setValue: UseFormSetValue<ProductCreateSchemaType>;
    category: ICategory | undefined;
    watch: UseFormWatch<ProductCreateSchemaType>;
}

const ProductCreateVariantsForm: React.FC<ProductCreateVariantsFormProps> = (props) => {
    const { index, category, register, setValue, errors, remove, watch } = props;

    const { data: discounts } = useGetDiscountsQuery();
    const { data: filters } = useGetFiltersQuery();

    const variationFilters = filters?.filter((filter) => filter.categoryId === category?.id) || [];

    const [photos, setPhotos] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            const dataTransfer = new DataTransfer();
            photos.forEach((file) => dataTransfer.items.add(file));
            inputRef.current.files = dataTransfer.files;
        }
        setValue(`variations.${index}.photos`, inputRef.current?.files as any);
    }, [photos]);

    const handleFilterChange = (value: string) => {
        const numericValue = Number(value);

        const currentFilters = watch(`variations.${index}.filters`) || [];
        let updatedFilters;

        if (isNaN(numericValue)) {
            updatedFilters = currentFilters.includes(numericValue)
                ? currentFilters.filter((v: number) => v !== numericValue)
                : [...currentFilters, 0];
        } else {
            updatedFilters = currentFilters.includes(numericValue)
                ? currentFilters.filter((v: number) => v !== numericValue)
                : [...currentFilters, numericValue];
        }

        // @ts-ignore
        setValue(`variations.${index}.filters`, updatedFilters);
    };

    return (
        <div key={index} className="flex flex-col justify-center p-4 my-2 rounded-xl border border-[#dbdce0]">
            <div>
                <Label htmlFor={`variations.${index}.shortDescription`}>Короткий опис*</Label>
                <Input
                    placeholder="наприклад: чоловічі колір синій"
                    id={`variations.${index}.shortDescription`}
                    {...register(`variations.${index}.shortDescription`)}
                />
                {errors.variations?.[index]?.shortDescription && (
                    <Attention>{errors.variations[index]?.shortDescription?.message}</Attention>
                )}
            </div>
            <div>
                <Label htmlFor={`variations.${index}.price`}>Ціна (грн)*</Label>
                <Input
                    type="number"
                    id={`variations.${index}.price`}
                    placeholder="наприклад: 1050"
                    {...register(`variations.${index}.price`)}
                />
                {errors.variations?.[index]?.price && <Attention>{errors.variations[index]?.price?.message}</Attention>}
            </div>
            <div>
                <Label htmlFor={`variations.${index}.discountValueId`}>Категорія*</Label>
                <Select
                    defaultValue=""
                    id={`variations.${index}.discountValueId`}
                    {...register(`variations.${index}.discountValueId`)}
                >
                    <Option value="">Виберіть знижку (необов'язково)</Option>
                    {discounts?.map((discount) =>
                        discount.discountValues?.map((discountValue) => (
                            <Option key={discountValue.id} value={discountValue.id}>
                                {`${discount.name} - ${discountValue.percentage}%`}
                            </Option>
                        )),
                    )}
                </Select>
                {errors.variations?.[index]?.discountValueId && (
                    <Attention>{errors.variations[index]?.discountValueId?.message}</Attention>
                )}
            </div>
            <div>
                <Label htmlFor={`variations.${index}.photos`}>Фото*</Label>
                <FileInputMultiple files={photos} setFiles={setPhotos}>
                    <input
                        {...register(`variations.${index}.photos`)}
                        id={`variations.${index}.photos`}
                        type="file"
                        onChange={(e) => handleFileChange(e, setPhotos)}
                        multiple
                        accept=".jpg, .jpeg, .png, .webp"
                        ref={inputRef}
                        className="hidden"
                    />
                </FileInputMultiple>
            </div>

            {variationFilters?.map((filter) => (
                <div key={filter.id} className="mb-2">
                    <Label htmlFor={`variations.${index}.filters.${filter.id}`}>{filter.name}*</Label>
                    <Select
                        defaultValue={0}
                        id={`variations.${index}.filters.${filter.id}`}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <Option disabled value={0}>
                            Виберіть фільтр (обов'язково)
                        </Option>
                        {filter.filterValues?.map((filterValue) => (
                            <Option key={filterValue.id} value={filterValue.id}>
                                {`${filterValue.name}`}
                            </Option>
                        ))}
                    </Select>
                    {errors.variations?.[index]?.filters && <Attention>{errors.variations[index]?.filters?.message}</Attention>}
                </div>
            ))}

            <Button type="button" onClick={() => remove(index)}>
                -
            </Button>
        </div>
    );
};

export default ProductCreateVariantsForm;
