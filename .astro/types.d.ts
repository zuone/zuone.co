declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "about";
  data: any
} & { render(): Render[".md"] };
};
"blog": {
"black-mirro-bandersnatch.mdx": {
	id: "black-mirro-bandersnatch.mdx";
  slug: "black-mirro-bandersnatch";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"cachemoment-new-branding.mdx": {
	id: "cachemoment-new-branding.mdx";
  slug: "cachemoment-new-branding";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"chatgpt-signup.mdx": {
	id: "chatgpt-signup.mdx";
  slug: "chatgpt-signup";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"cron-design.mdx": {
	id: "cron-design.mdx";
  slug: "cron-design";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"css-standard.mdx": {
	id: "css-standard.mdx";
  slug: "css-standard";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"design-trend-2019.mdx": {
	id: "design-trend-2019.mdx";
  slug: "design-trend-2019";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"draw-1.mdx": {
	id: "draw-1.mdx";
  slug: "draw-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"figma-bytedance.mdx": {
	id: "figma-bytedance.mdx";
  slug: "figma-bytedance";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"figmachina.mdx": {
	id: "figmachina.mdx";
  slug: "figmachina";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"flatland.mdx": {
	id: "flatland.mdx";
  slug: "flatland";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"life-in-a-day-2020.mdx": {
	id: "life-in-a-day-2020.mdx";
  slug: "life-in-a-day-2020";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"luowang.mdx": {
	id: "luowang.mdx";
  slug: "luowang";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"master-principle.mdx": {
	id: "master-principle.mdx";
  slug: "master-principle";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"mastergo-principle-case.mdx": {
	id: "mastergo-principle-case.mdx";
  slug: "mastergo-principle-case";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"medium-new-logo.mdx": {
	id: "medium-new-logo.mdx";
  slug: "medium-new-logo";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"meetup-ziru.mdx": {
	id: "meetup-ziru.mdx";
  slug: "meetup-ziru";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"personal-website.mdx": {
	id: "personal-website.mdx";
  slug: "personal-website";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"share-movie-korea.mdx": {
	id: "share-movie-korea.mdx";
  slug: "share-movie-korea";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"share-movie-science.mdx": {
	id: "share-movie-science.mdx";
  slug: "share-movie-science";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"think-plus.mdx": {
	id: "think-plus.mdx";
  slug: "think-plus";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"website-for-designer-1.mdx": {
	id: "website-for-designer-1.mdx";
  slug: "website-for-designer-1";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"website-for-designer-2.mdx": {
	id: "website-for-designer-2.mdx";
  slug: "website-for-designer-2";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
"zuibishe.mdx": {
	id: "zuibishe.mdx";
  slug: "zuibishe";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".mdx"] };
};
"project": {
".mastergo-design-system.mdx": {
	id: ".mastergo-design-system.mdx";
  slug: "mastergo-design-system";
  body: string;
  collection: "project";
  data: any
} & { render(): Render[".mdx"] };
"cachemoment.mdx": {
	id: "cachemoment.mdx";
  slug: "cachemoment";
  body: string;
  collection: "project";
  data: any
} & { render(): Render[".mdx"] };
"lanhu-website.mdx": {
	id: "lanhu-website.mdx";
  slug: "lanhu-website";
  body: string;
  collection: "project";
  data: any
} & { render(): Render[".mdx"] };
"mastergo.mdx": {
	id: "mastergo.mdx";
  slug: "mastergo";
  body: string;
  collection: "project";
  data: any
} & { render(): Render[".mdx"] };
"smartisan.mdx": {
	id: "smartisan.mdx";
  slug: "smartisan";
  body: string;
  collection: "project";
  data: any
} & { render(): Render[".mdx"] };
};
"team": {
"janette-lynch.md": {
	id: "janette-lynch.md";
  slug: "janette-lynch";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"marcell-ziemann.md": {
	id: "marcell-ziemann.md";
  slug: "marcell-ziemann";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
"robert-palmer.md": {
	id: "robert-palmer.md";
  slug: "robert-palmer";
  body: string;
  collection: "team";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
