import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository : Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category); 
    return category;
  }

  async findAll() {
    const foundCategories = await this.categoryRepository.find({});
    if(!foundCategories) throw new NotFoundException('Categories not register yet')
    return foundCategories;
  }

  async findOne(id : number) {
    const foundCategory = await this.categoryRepository.findOneBy({id});
    if(!foundCategory) throw new NotFoundException(`Category with id ${id} not found`)
    return foundCategory;
  }
  
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const newCategory = await this.categoryRepository.preload({id, ...updateCategoryDto});
    if(!newCategory) throw new NotFoundException();
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

}
