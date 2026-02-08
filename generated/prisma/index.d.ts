
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Pfand
 * 
 */
export type Pfand = $Result.DefaultSelection<Prisma.$PfandPayload>
/**
 * Model Drink
 * 
 */
export type Drink = $Result.DefaultSelection<Prisma.$DrinkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PfandType: {
  EINWEG: 'EINWEG',
  MEHRWEG: 'MEHRWEG',
  GLAS: 'GLAS'
};

export type PfandType = (typeof PfandType)[keyof typeof PfandType]

}

export type PfandType = $Enums.PfandType

export const PfandType: typeof $Enums.PfandType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pfands
 * const pfands = await prisma.pfand.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pfands
   * const pfands = await prisma.pfand.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pfand`: Exposes CRUD operations for the **Pfand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pfands
    * const pfands = await prisma.pfand.findMany()
    * ```
    */
  get pfand(): Prisma.PfandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drink`: Exposes CRUD operations for the **Drink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drinks
    * const drinks = await prisma.drink.findMany()
    * ```
    */
  get drink(): Prisma.DrinkDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Pfand: 'Pfand',
    Drink: 'Drink'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pfand" | "drink"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Pfand: {
        payload: Prisma.$PfandPayload<ExtArgs>
        fields: Prisma.PfandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PfandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PfandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          findFirst: {
            args: Prisma.PfandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PfandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          findMany: {
            args: Prisma.PfandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>[]
          }
          create: {
            args: Prisma.PfandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          createMany: {
            args: Prisma.PfandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PfandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>[]
          }
          delete: {
            args: Prisma.PfandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          update: {
            args: Prisma.PfandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          deleteMany: {
            args: Prisma.PfandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PfandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PfandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>[]
          }
          upsert: {
            args: Prisma.PfandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PfandPayload>
          }
          aggregate: {
            args: Prisma.PfandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePfand>
          }
          groupBy: {
            args: Prisma.PfandGroupByArgs<ExtArgs>
            result: $Utils.Optional<PfandGroupByOutputType>[]
          }
          count: {
            args: Prisma.PfandCountArgs<ExtArgs>
            result: $Utils.Optional<PfandCountAggregateOutputType> | number
          }
        }
      }
      Drink: {
        payload: Prisma.$DrinkPayload<ExtArgs>
        fields: Prisma.DrinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DrinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DrinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          findFirst: {
            args: Prisma.DrinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DrinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          findMany: {
            args: Prisma.DrinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>[]
          }
          create: {
            args: Prisma.DrinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          createMany: {
            args: Prisma.DrinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DrinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>[]
          }
          delete: {
            args: Prisma.DrinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          update: {
            args: Prisma.DrinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          deleteMany: {
            args: Prisma.DrinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DrinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DrinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>[]
          }
          upsert: {
            args: Prisma.DrinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrinkPayload>
          }
          aggregate: {
            args: Prisma.DrinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrink>
          }
          groupBy: {
            args: Prisma.DrinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<DrinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.DrinkCountArgs<ExtArgs>
            result: $Utils.Optional<DrinkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pfand?: PfandOmit
    drink?: DrinkOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Pfand
   */

  export type AggregatePfand = {
    _count: PfandCountAggregateOutputType | null
    _avg: PfandAvgAggregateOutputType | null
    _sum: PfandSumAggregateOutputType | null
    _min: PfandMinAggregateOutputType | null
    _max: PfandMaxAggregateOutputType | null
  }

  export type PfandAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type PfandSumAggregateOutputType = {
    id: number | null
    quantity: number | null
  }

  export type PfandMinAggregateOutputType = {
    id: number | null
    quantity: number | null
    pfandType: $Enums.PfandType | null
  }

  export type PfandMaxAggregateOutputType = {
    id: number | null
    quantity: number | null
    pfandType: $Enums.PfandType | null
  }

  export type PfandCountAggregateOutputType = {
    id: number
    quantity: number
    pfandType: number
    _all: number
  }


  export type PfandAvgAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type PfandSumAggregateInputType = {
    id?: true
    quantity?: true
  }

  export type PfandMinAggregateInputType = {
    id?: true
    quantity?: true
    pfandType?: true
  }

  export type PfandMaxAggregateInputType = {
    id?: true
    quantity?: true
    pfandType?: true
  }

  export type PfandCountAggregateInputType = {
    id?: true
    quantity?: true
    pfandType?: true
    _all?: true
  }

  export type PfandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pfand to aggregate.
     */
    where?: PfandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pfands to fetch.
     */
    orderBy?: PfandOrderByWithRelationInput | PfandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PfandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pfands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pfands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pfands
    **/
    _count?: true | PfandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PfandAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PfandSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PfandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PfandMaxAggregateInputType
  }

  export type GetPfandAggregateType<T extends PfandAggregateArgs> = {
        [P in keyof T & keyof AggregatePfand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePfand[P]>
      : GetScalarType<T[P], AggregatePfand[P]>
  }




  export type PfandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PfandWhereInput
    orderBy?: PfandOrderByWithAggregationInput | PfandOrderByWithAggregationInput[]
    by: PfandScalarFieldEnum[] | PfandScalarFieldEnum
    having?: PfandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PfandCountAggregateInputType | true
    _avg?: PfandAvgAggregateInputType
    _sum?: PfandSumAggregateInputType
    _min?: PfandMinAggregateInputType
    _max?: PfandMaxAggregateInputType
  }

  export type PfandGroupByOutputType = {
    id: number
    quantity: number
    pfandType: $Enums.PfandType
    _count: PfandCountAggregateOutputType | null
    _avg: PfandAvgAggregateOutputType | null
    _sum: PfandSumAggregateOutputType | null
    _min: PfandMinAggregateOutputType | null
    _max: PfandMaxAggregateOutputType | null
  }

  type GetPfandGroupByPayload<T extends PfandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PfandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PfandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PfandGroupByOutputType[P]>
            : GetScalarType<T[P], PfandGroupByOutputType[P]>
        }
      >
    >


  export type PfandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    pfandType?: boolean
  }, ExtArgs["result"]["pfand"]>

  export type PfandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    pfandType?: boolean
  }, ExtArgs["result"]["pfand"]>

  export type PfandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    quantity?: boolean
    pfandType?: boolean
  }, ExtArgs["result"]["pfand"]>

  export type PfandSelectScalar = {
    id?: boolean
    quantity?: boolean
    pfandType?: boolean
  }

  export type PfandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "quantity" | "pfandType", ExtArgs["result"]["pfand"]>

  export type $PfandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pfand"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      quantity: number
      pfandType: $Enums.PfandType
    }, ExtArgs["result"]["pfand"]>
    composites: {}
  }

  type PfandGetPayload<S extends boolean | null | undefined | PfandDefaultArgs> = $Result.GetResult<Prisma.$PfandPayload, S>

  type PfandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PfandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PfandCountAggregateInputType | true
    }

  export interface PfandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pfand'], meta: { name: 'Pfand' } }
    /**
     * Find zero or one Pfand that matches the filter.
     * @param {PfandFindUniqueArgs} args - Arguments to find a Pfand
     * @example
     * // Get one Pfand
     * const pfand = await prisma.pfand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PfandFindUniqueArgs>(args: SelectSubset<T, PfandFindUniqueArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pfand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PfandFindUniqueOrThrowArgs} args - Arguments to find a Pfand
     * @example
     * // Get one Pfand
     * const pfand = await prisma.pfand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PfandFindUniqueOrThrowArgs>(args: SelectSubset<T, PfandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pfand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandFindFirstArgs} args - Arguments to find a Pfand
     * @example
     * // Get one Pfand
     * const pfand = await prisma.pfand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PfandFindFirstArgs>(args?: SelectSubset<T, PfandFindFirstArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pfand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandFindFirstOrThrowArgs} args - Arguments to find a Pfand
     * @example
     * // Get one Pfand
     * const pfand = await prisma.pfand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PfandFindFirstOrThrowArgs>(args?: SelectSubset<T, PfandFindFirstOrThrowArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pfands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pfands
     * const pfands = await prisma.pfand.findMany()
     * 
     * // Get first 10 Pfands
     * const pfands = await prisma.pfand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pfandWithIdOnly = await prisma.pfand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PfandFindManyArgs>(args?: SelectSubset<T, PfandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pfand.
     * @param {PfandCreateArgs} args - Arguments to create a Pfand.
     * @example
     * // Create one Pfand
     * const Pfand = await prisma.pfand.create({
     *   data: {
     *     // ... data to create a Pfand
     *   }
     * })
     * 
     */
    create<T extends PfandCreateArgs>(args: SelectSubset<T, PfandCreateArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pfands.
     * @param {PfandCreateManyArgs} args - Arguments to create many Pfands.
     * @example
     * // Create many Pfands
     * const pfand = await prisma.pfand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PfandCreateManyArgs>(args?: SelectSubset<T, PfandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pfands and returns the data saved in the database.
     * @param {PfandCreateManyAndReturnArgs} args - Arguments to create many Pfands.
     * @example
     * // Create many Pfands
     * const pfand = await prisma.pfand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pfands and only return the `id`
     * const pfandWithIdOnly = await prisma.pfand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PfandCreateManyAndReturnArgs>(args?: SelectSubset<T, PfandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pfand.
     * @param {PfandDeleteArgs} args - Arguments to delete one Pfand.
     * @example
     * // Delete one Pfand
     * const Pfand = await prisma.pfand.delete({
     *   where: {
     *     // ... filter to delete one Pfand
     *   }
     * })
     * 
     */
    delete<T extends PfandDeleteArgs>(args: SelectSubset<T, PfandDeleteArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pfand.
     * @param {PfandUpdateArgs} args - Arguments to update one Pfand.
     * @example
     * // Update one Pfand
     * const pfand = await prisma.pfand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PfandUpdateArgs>(args: SelectSubset<T, PfandUpdateArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pfands.
     * @param {PfandDeleteManyArgs} args - Arguments to filter Pfands to delete.
     * @example
     * // Delete a few Pfands
     * const { count } = await prisma.pfand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PfandDeleteManyArgs>(args?: SelectSubset<T, PfandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pfands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pfands
     * const pfand = await prisma.pfand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PfandUpdateManyArgs>(args: SelectSubset<T, PfandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pfands and returns the data updated in the database.
     * @param {PfandUpdateManyAndReturnArgs} args - Arguments to update many Pfands.
     * @example
     * // Update many Pfands
     * const pfand = await prisma.pfand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pfands and only return the `id`
     * const pfandWithIdOnly = await prisma.pfand.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PfandUpdateManyAndReturnArgs>(args: SelectSubset<T, PfandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pfand.
     * @param {PfandUpsertArgs} args - Arguments to update or create a Pfand.
     * @example
     * // Update or create a Pfand
     * const pfand = await prisma.pfand.upsert({
     *   create: {
     *     // ... data to create a Pfand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pfand we want to update
     *   }
     * })
     */
    upsert<T extends PfandUpsertArgs>(args: SelectSubset<T, PfandUpsertArgs<ExtArgs>>): Prisma__PfandClient<$Result.GetResult<Prisma.$PfandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pfands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandCountArgs} args - Arguments to filter Pfands to count.
     * @example
     * // Count the number of Pfands
     * const count = await prisma.pfand.count({
     *   where: {
     *     // ... the filter for the Pfands we want to count
     *   }
     * })
    **/
    count<T extends PfandCountArgs>(
      args?: Subset<T, PfandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PfandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pfand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PfandAggregateArgs>(args: Subset<T, PfandAggregateArgs>): Prisma.PrismaPromise<GetPfandAggregateType<T>>

    /**
     * Group by Pfand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PfandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PfandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PfandGroupByArgs['orderBy'] }
        : { orderBy?: PfandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PfandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPfandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pfand model
   */
  readonly fields: PfandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pfand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PfandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pfand model
   */
  interface PfandFieldRefs {
    readonly id: FieldRef<"Pfand", 'Int'>
    readonly quantity: FieldRef<"Pfand", 'Int'>
    readonly pfandType: FieldRef<"Pfand", 'PfandType'>
  }
    

  // Custom InputTypes
  /**
   * Pfand findUnique
   */
  export type PfandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter, which Pfand to fetch.
     */
    where: PfandWhereUniqueInput
  }

  /**
   * Pfand findUniqueOrThrow
   */
  export type PfandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter, which Pfand to fetch.
     */
    where: PfandWhereUniqueInput
  }

  /**
   * Pfand findFirst
   */
  export type PfandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter, which Pfand to fetch.
     */
    where?: PfandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pfands to fetch.
     */
    orderBy?: PfandOrderByWithRelationInput | PfandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pfands.
     */
    cursor?: PfandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pfands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pfands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pfands.
     */
    distinct?: PfandScalarFieldEnum | PfandScalarFieldEnum[]
  }

  /**
   * Pfand findFirstOrThrow
   */
  export type PfandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter, which Pfand to fetch.
     */
    where?: PfandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pfands to fetch.
     */
    orderBy?: PfandOrderByWithRelationInput | PfandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pfands.
     */
    cursor?: PfandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pfands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pfands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pfands.
     */
    distinct?: PfandScalarFieldEnum | PfandScalarFieldEnum[]
  }

  /**
   * Pfand findMany
   */
  export type PfandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter, which Pfands to fetch.
     */
    where?: PfandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pfands to fetch.
     */
    orderBy?: PfandOrderByWithRelationInput | PfandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pfands.
     */
    cursor?: PfandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pfands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pfands.
     */
    skip?: number
    distinct?: PfandScalarFieldEnum | PfandScalarFieldEnum[]
  }

  /**
   * Pfand create
   */
  export type PfandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * The data needed to create a Pfand.
     */
    data: XOR<PfandCreateInput, PfandUncheckedCreateInput>
  }

  /**
   * Pfand createMany
   */
  export type PfandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pfands.
     */
    data: PfandCreateManyInput | PfandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pfand createManyAndReturn
   */
  export type PfandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * The data used to create many Pfands.
     */
    data: PfandCreateManyInput | PfandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pfand update
   */
  export type PfandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * The data needed to update a Pfand.
     */
    data: XOR<PfandUpdateInput, PfandUncheckedUpdateInput>
    /**
     * Choose, which Pfand to update.
     */
    where: PfandWhereUniqueInput
  }

  /**
   * Pfand updateMany
   */
  export type PfandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pfands.
     */
    data: XOR<PfandUpdateManyMutationInput, PfandUncheckedUpdateManyInput>
    /**
     * Filter which Pfands to update
     */
    where?: PfandWhereInput
    /**
     * Limit how many Pfands to update.
     */
    limit?: number
  }

  /**
   * Pfand updateManyAndReturn
   */
  export type PfandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * The data used to update Pfands.
     */
    data: XOR<PfandUpdateManyMutationInput, PfandUncheckedUpdateManyInput>
    /**
     * Filter which Pfands to update
     */
    where?: PfandWhereInput
    /**
     * Limit how many Pfands to update.
     */
    limit?: number
  }

  /**
   * Pfand upsert
   */
  export type PfandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * The filter to search for the Pfand to update in case it exists.
     */
    where: PfandWhereUniqueInput
    /**
     * In case the Pfand found by the `where` argument doesn't exist, create a new Pfand with this data.
     */
    create: XOR<PfandCreateInput, PfandUncheckedCreateInput>
    /**
     * In case the Pfand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PfandUpdateInput, PfandUncheckedUpdateInput>
  }

  /**
   * Pfand delete
   */
  export type PfandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
    /**
     * Filter which Pfand to delete.
     */
    where: PfandWhereUniqueInput
  }

  /**
   * Pfand deleteMany
   */
  export type PfandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pfands to delete
     */
    where?: PfandWhereInput
    /**
     * Limit how many Pfands to delete.
     */
    limit?: number
  }

  /**
   * Pfand without action
   */
  export type PfandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pfand
     */
    select?: PfandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pfand
     */
    omit?: PfandOmit<ExtArgs> | null
  }


  /**
   * Model Drink
   */

  export type AggregateDrink = {
    _count: DrinkCountAggregateOutputType | null
    _avg: DrinkAvgAggregateOutputType | null
    _sum: DrinkSumAggregateOutputType | null
    _min: DrinkMinAggregateOutputType | null
    _max: DrinkMaxAggregateOutputType | null
  }

  export type DrinkAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
    openedQuantity: number | null
  }

  export type DrinkSumAggregateOutputType = {
    id: number | null
    quantity: number | null
    openedQuantity: number | null
  }

  export type DrinkMinAggregateOutputType = {
    id: number | null
    barcode: string | null
    name: string | null
    quantity: number | null
    openedQuantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DrinkMaxAggregateOutputType = {
    id: number | null
    barcode: string | null
    name: string | null
    quantity: number | null
    openedQuantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DrinkCountAggregateOutputType = {
    id: number
    barcode: number
    name: number
    quantity: number
    openedQuantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DrinkAvgAggregateInputType = {
    id?: true
    quantity?: true
    openedQuantity?: true
  }

  export type DrinkSumAggregateInputType = {
    id?: true
    quantity?: true
    openedQuantity?: true
  }

  export type DrinkMinAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    quantity?: true
    openedQuantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DrinkMaxAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    quantity?: true
    openedQuantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DrinkCountAggregateInputType = {
    id?: true
    barcode?: true
    name?: true
    quantity?: true
    openedQuantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DrinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drink to aggregate.
     */
    where?: DrinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drinks to fetch.
     */
    orderBy?: DrinkOrderByWithRelationInput | DrinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DrinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drinks
    **/
    _count?: true | DrinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DrinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DrinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DrinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DrinkMaxAggregateInputType
  }

  export type GetDrinkAggregateType<T extends DrinkAggregateArgs> = {
        [P in keyof T & keyof AggregateDrink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrink[P]>
      : GetScalarType<T[P], AggregateDrink[P]>
  }




  export type DrinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DrinkWhereInput
    orderBy?: DrinkOrderByWithAggregationInput | DrinkOrderByWithAggregationInput[]
    by: DrinkScalarFieldEnum[] | DrinkScalarFieldEnum
    having?: DrinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DrinkCountAggregateInputType | true
    _avg?: DrinkAvgAggregateInputType
    _sum?: DrinkSumAggregateInputType
    _min?: DrinkMinAggregateInputType
    _max?: DrinkMaxAggregateInputType
  }

  export type DrinkGroupByOutputType = {
    id: number
    barcode: string
    name: string
    quantity: number
    openedQuantity: number
    createdAt: Date
    updatedAt: Date
    _count: DrinkCountAggregateOutputType | null
    _avg: DrinkAvgAggregateOutputType | null
    _sum: DrinkSumAggregateOutputType | null
    _min: DrinkMinAggregateOutputType | null
    _max: DrinkMaxAggregateOutputType | null
  }

  type GetDrinkGroupByPayload<T extends DrinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DrinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DrinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DrinkGroupByOutputType[P]>
            : GetScalarType<T[P], DrinkGroupByOutputType[P]>
        }
      >
    >


  export type DrinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    quantity?: boolean
    openedQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drink"]>

  export type DrinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    quantity?: boolean
    openedQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drink"]>

  export type DrinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    barcode?: boolean
    name?: boolean
    quantity?: boolean
    openedQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drink"]>

  export type DrinkSelectScalar = {
    id?: boolean
    barcode?: boolean
    name?: boolean
    quantity?: boolean
    openedQuantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DrinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "barcode" | "name" | "quantity" | "openedQuantity" | "createdAt" | "updatedAt", ExtArgs["result"]["drink"]>

  export type $DrinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Drink"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      barcode: string
      name: string
      quantity: number
      openedQuantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["drink"]>
    composites: {}
  }

  type DrinkGetPayload<S extends boolean | null | undefined | DrinkDefaultArgs> = $Result.GetResult<Prisma.$DrinkPayload, S>

  type DrinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DrinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DrinkCountAggregateInputType | true
    }

  export interface DrinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Drink'], meta: { name: 'Drink' } }
    /**
     * Find zero or one Drink that matches the filter.
     * @param {DrinkFindUniqueArgs} args - Arguments to find a Drink
     * @example
     * // Get one Drink
     * const drink = await prisma.drink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DrinkFindUniqueArgs>(args: SelectSubset<T, DrinkFindUniqueArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DrinkFindUniqueOrThrowArgs} args - Arguments to find a Drink
     * @example
     * // Get one Drink
     * const drink = await prisma.drink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DrinkFindUniqueOrThrowArgs>(args: SelectSubset<T, DrinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkFindFirstArgs} args - Arguments to find a Drink
     * @example
     * // Get one Drink
     * const drink = await prisma.drink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DrinkFindFirstArgs>(args?: SelectSubset<T, DrinkFindFirstArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkFindFirstOrThrowArgs} args - Arguments to find a Drink
     * @example
     * // Get one Drink
     * const drink = await prisma.drink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DrinkFindFirstOrThrowArgs>(args?: SelectSubset<T, DrinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drinks
     * const drinks = await prisma.drink.findMany()
     * 
     * // Get first 10 Drinks
     * const drinks = await prisma.drink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const drinkWithIdOnly = await prisma.drink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DrinkFindManyArgs>(args?: SelectSubset<T, DrinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drink.
     * @param {DrinkCreateArgs} args - Arguments to create a Drink.
     * @example
     * // Create one Drink
     * const Drink = await prisma.drink.create({
     *   data: {
     *     // ... data to create a Drink
     *   }
     * })
     * 
     */
    create<T extends DrinkCreateArgs>(args: SelectSubset<T, DrinkCreateArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drinks.
     * @param {DrinkCreateManyArgs} args - Arguments to create many Drinks.
     * @example
     * // Create many Drinks
     * const drink = await prisma.drink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DrinkCreateManyArgs>(args?: SelectSubset<T, DrinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drinks and returns the data saved in the database.
     * @param {DrinkCreateManyAndReturnArgs} args - Arguments to create many Drinks.
     * @example
     * // Create many Drinks
     * const drink = await prisma.drink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drinks and only return the `id`
     * const drinkWithIdOnly = await prisma.drink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DrinkCreateManyAndReturnArgs>(args?: SelectSubset<T, DrinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Drink.
     * @param {DrinkDeleteArgs} args - Arguments to delete one Drink.
     * @example
     * // Delete one Drink
     * const Drink = await prisma.drink.delete({
     *   where: {
     *     // ... filter to delete one Drink
     *   }
     * })
     * 
     */
    delete<T extends DrinkDeleteArgs>(args: SelectSubset<T, DrinkDeleteArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drink.
     * @param {DrinkUpdateArgs} args - Arguments to update one Drink.
     * @example
     * // Update one Drink
     * const drink = await prisma.drink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DrinkUpdateArgs>(args: SelectSubset<T, DrinkUpdateArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drinks.
     * @param {DrinkDeleteManyArgs} args - Arguments to filter Drinks to delete.
     * @example
     * // Delete a few Drinks
     * const { count } = await prisma.drink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DrinkDeleteManyArgs>(args?: SelectSubset<T, DrinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drinks
     * const drink = await prisma.drink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DrinkUpdateManyArgs>(args: SelectSubset<T, DrinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drinks and returns the data updated in the database.
     * @param {DrinkUpdateManyAndReturnArgs} args - Arguments to update many Drinks.
     * @example
     * // Update many Drinks
     * const drink = await prisma.drink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drinks and only return the `id`
     * const drinkWithIdOnly = await prisma.drink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DrinkUpdateManyAndReturnArgs>(args: SelectSubset<T, DrinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Drink.
     * @param {DrinkUpsertArgs} args - Arguments to update or create a Drink.
     * @example
     * // Update or create a Drink
     * const drink = await prisma.drink.upsert({
     *   create: {
     *     // ... data to create a Drink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drink we want to update
     *   }
     * })
     */
    upsert<T extends DrinkUpsertArgs>(args: SelectSubset<T, DrinkUpsertArgs<ExtArgs>>): Prisma__DrinkClient<$Result.GetResult<Prisma.$DrinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkCountArgs} args - Arguments to filter Drinks to count.
     * @example
     * // Count the number of Drinks
     * const count = await prisma.drink.count({
     *   where: {
     *     // ... the filter for the Drinks we want to count
     *   }
     * })
    **/
    count<T extends DrinkCountArgs>(
      args?: Subset<T, DrinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DrinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DrinkAggregateArgs>(args: Subset<T, DrinkAggregateArgs>): Prisma.PrismaPromise<GetDrinkAggregateType<T>>

    /**
     * Group by Drink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DrinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DrinkGroupByArgs['orderBy'] }
        : { orderBy?: DrinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DrinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDrinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Drink model
   */
  readonly fields: DrinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Drink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DrinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Drink model
   */
  interface DrinkFieldRefs {
    readonly id: FieldRef<"Drink", 'Int'>
    readonly barcode: FieldRef<"Drink", 'String'>
    readonly name: FieldRef<"Drink", 'String'>
    readonly quantity: FieldRef<"Drink", 'Int'>
    readonly openedQuantity: FieldRef<"Drink", 'Int'>
    readonly createdAt: FieldRef<"Drink", 'DateTime'>
    readonly updatedAt: FieldRef<"Drink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Drink findUnique
   */
  export type DrinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter, which Drink to fetch.
     */
    where: DrinkWhereUniqueInput
  }

  /**
   * Drink findUniqueOrThrow
   */
  export type DrinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter, which Drink to fetch.
     */
    where: DrinkWhereUniqueInput
  }

  /**
   * Drink findFirst
   */
  export type DrinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter, which Drink to fetch.
     */
    where?: DrinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drinks to fetch.
     */
    orderBy?: DrinkOrderByWithRelationInput | DrinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drinks.
     */
    cursor?: DrinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drinks.
     */
    distinct?: DrinkScalarFieldEnum | DrinkScalarFieldEnum[]
  }

  /**
   * Drink findFirstOrThrow
   */
  export type DrinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter, which Drink to fetch.
     */
    where?: DrinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drinks to fetch.
     */
    orderBy?: DrinkOrderByWithRelationInput | DrinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drinks.
     */
    cursor?: DrinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drinks.
     */
    distinct?: DrinkScalarFieldEnum | DrinkScalarFieldEnum[]
  }

  /**
   * Drink findMany
   */
  export type DrinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter, which Drinks to fetch.
     */
    where?: DrinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drinks to fetch.
     */
    orderBy?: DrinkOrderByWithRelationInput | DrinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drinks.
     */
    cursor?: DrinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drinks.
     */
    skip?: number
    distinct?: DrinkScalarFieldEnum | DrinkScalarFieldEnum[]
  }

  /**
   * Drink create
   */
  export type DrinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * The data needed to create a Drink.
     */
    data: XOR<DrinkCreateInput, DrinkUncheckedCreateInput>
  }

  /**
   * Drink createMany
   */
  export type DrinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drinks.
     */
    data: DrinkCreateManyInput | DrinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Drink createManyAndReturn
   */
  export type DrinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * The data used to create many Drinks.
     */
    data: DrinkCreateManyInput | DrinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Drink update
   */
  export type DrinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * The data needed to update a Drink.
     */
    data: XOR<DrinkUpdateInput, DrinkUncheckedUpdateInput>
    /**
     * Choose, which Drink to update.
     */
    where: DrinkWhereUniqueInput
  }

  /**
   * Drink updateMany
   */
  export type DrinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drinks.
     */
    data: XOR<DrinkUpdateManyMutationInput, DrinkUncheckedUpdateManyInput>
    /**
     * Filter which Drinks to update
     */
    where?: DrinkWhereInput
    /**
     * Limit how many Drinks to update.
     */
    limit?: number
  }

  /**
   * Drink updateManyAndReturn
   */
  export type DrinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * The data used to update Drinks.
     */
    data: XOR<DrinkUpdateManyMutationInput, DrinkUncheckedUpdateManyInput>
    /**
     * Filter which Drinks to update
     */
    where?: DrinkWhereInput
    /**
     * Limit how many Drinks to update.
     */
    limit?: number
  }

  /**
   * Drink upsert
   */
  export type DrinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * The filter to search for the Drink to update in case it exists.
     */
    where: DrinkWhereUniqueInput
    /**
     * In case the Drink found by the `where` argument doesn't exist, create a new Drink with this data.
     */
    create: XOR<DrinkCreateInput, DrinkUncheckedCreateInput>
    /**
     * In case the Drink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DrinkUpdateInput, DrinkUncheckedUpdateInput>
  }

  /**
   * Drink delete
   */
  export type DrinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
    /**
     * Filter which Drink to delete.
     */
    where: DrinkWhereUniqueInput
  }

  /**
   * Drink deleteMany
   */
  export type DrinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drinks to delete
     */
    where?: DrinkWhereInput
    /**
     * Limit how many Drinks to delete.
     */
    limit?: number
  }

  /**
   * Drink without action
   */
  export type DrinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drink
     */
    select?: DrinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drink
     */
    omit?: DrinkOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PfandScalarFieldEnum: {
    id: 'id',
    quantity: 'quantity',
    pfandType: 'pfandType'
  };

  export type PfandScalarFieldEnum = (typeof PfandScalarFieldEnum)[keyof typeof PfandScalarFieldEnum]


  export const DrinkScalarFieldEnum: {
    id: 'id',
    barcode: 'barcode',
    name: 'name',
    quantity: 'quantity',
    openedQuantity: 'openedQuantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DrinkScalarFieldEnum = (typeof DrinkScalarFieldEnum)[keyof typeof DrinkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PfandType'
   */
  export type EnumPfandTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PfandType'>
    


  /**
   * Reference to a field of type 'PfandType[]'
   */
  export type ListEnumPfandTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PfandType[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PfandWhereInput = {
    AND?: PfandWhereInput | PfandWhereInput[]
    OR?: PfandWhereInput[]
    NOT?: PfandWhereInput | PfandWhereInput[]
    id?: IntFilter<"Pfand"> | number
    quantity?: IntFilter<"Pfand"> | number
    pfandType?: EnumPfandTypeFilter<"Pfand"> | $Enums.PfandType
  }

  export type PfandOrderByWithRelationInput = {
    id?: SortOrder
    quantity?: SortOrder
    pfandType?: SortOrder
  }

  export type PfandWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PfandWhereInput | PfandWhereInput[]
    OR?: PfandWhereInput[]
    NOT?: PfandWhereInput | PfandWhereInput[]
    quantity?: IntFilter<"Pfand"> | number
    pfandType?: EnumPfandTypeFilter<"Pfand"> | $Enums.PfandType
  }, "id">

  export type PfandOrderByWithAggregationInput = {
    id?: SortOrder
    quantity?: SortOrder
    pfandType?: SortOrder
    _count?: PfandCountOrderByAggregateInput
    _avg?: PfandAvgOrderByAggregateInput
    _max?: PfandMaxOrderByAggregateInput
    _min?: PfandMinOrderByAggregateInput
    _sum?: PfandSumOrderByAggregateInput
  }

  export type PfandScalarWhereWithAggregatesInput = {
    AND?: PfandScalarWhereWithAggregatesInput | PfandScalarWhereWithAggregatesInput[]
    OR?: PfandScalarWhereWithAggregatesInput[]
    NOT?: PfandScalarWhereWithAggregatesInput | PfandScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pfand"> | number
    quantity?: IntWithAggregatesFilter<"Pfand"> | number
    pfandType?: EnumPfandTypeWithAggregatesFilter<"Pfand"> | $Enums.PfandType
  }

  export type DrinkWhereInput = {
    AND?: DrinkWhereInput | DrinkWhereInput[]
    OR?: DrinkWhereInput[]
    NOT?: DrinkWhereInput | DrinkWhereInput[]
    id?: IntFilter<"Drink"> | number
    barcode?: StringFilter<"Drink"> | string
    name?: StringFilter<"Drink"> | string
    quantity?: IntFilter<"Drink"> | number
    openedQuantity?: IntFilter<"Drink"> | number
    createdAt?: DateTimeFilter<"Drink"> | Date | string
    updatedAt?: DateTimeFilter<"Drink"> | Date | string
  }

  export type DrinkOrderByWithRelationInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrinkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    barcode?: string
    AND?: DrinkWhereInput | DrinkWhereInput[]
    OR?: DrinkWhereInput[]
    NOT?: DrinkWhereInput | DrinkWhereInput[]
    name?: StringFilter<"Drink"> | string
    quantity?: IntFilter<"Drink"> | number
    openedQuantity?: IntFilter<"Drink"> | number
    createdAt?: DateTimeFilter<"Drink"> | Date | string
    updatedAt?: DateTimeFilter<"Drink"> | Date | string
  }, "id" | "barcode">

  export type DrinkOrderByWithAggregationInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DrinkCountOrderByAggregateInput
    _avg?: DrinkAvgOrderByAggregateInput
    _max?: DrinkMaxOrderByAggregateInput
    _min?: DrinkMinOrderByAggregateInput
    _sum?: DrinkSumOrderByAggregateInput
  }

  export type DrinkScalarWhereWithAggregatesInput = {
    AND?: DrinkScalarWhereWithAggregatesInput | DrinkScalarWhereWithAggregatesInput[]
    OR?: DrinkScalarWhereWithAggregatesInput[]
    NOT?: DrinkScalarWhereWithAggregatesInput | DrinkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Drink"> | number
    barcode?: StringWithAggregatesFilter<"Drink"> | string
    name?: StringWithAggregatesFilter<"Drink"> | string
    quantity?: IntWithAggregatesFilter<"Drink"> | number
    openedQuantity?: IntWithAggregatesFilter<"Drink"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Drink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Drink"> | Date | string
  }

  export type PfandCreateInput = {
    quantity: number
    pfandType: $Enums.PfandType
  }

  export type PfandUncheckedCreateInput = {
    id?: number
    quantity: number
    pfandType: $Enums.PfandType
  }

  export type PfandUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    pfandType?: EnumPfandTypeFieldUpdateOperationsInput | $Enums.PfandType
  }

  export type PfandUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    pfandType?: EnumPfandTypeFieldUpdateOperationsInput | $Enums.PfandType
  }

  export type PfandCreateManyInput = {
    id?: number
    quantity: number
    pfandType: $Enums.PfandType
  }

  export type PfandUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    pfandType?: EnumPfandTypeFieldUpdateOperationsInput | $Enums.PfandType
  }

  export type PfandUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    pfandType?: EnumPfandTypeFieldUpdateOperationsInput | $Enums.PfandType
  }

  export type DrinkCreateInput = {
    barcode: string
    name: string
    quantity?: number
    openedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DrinkUncheckedCreateInput = {
    id?: number
    barcode: string
    name: string
    quantity?: number
    openedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DrinkUpdateInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    openedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DrinkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    openedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DrinkCreateManyInput = {
    id?: number
    barcode: string
    name: string
    quantity?: number
    openedQuantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DrinkUpdateManyMutationInput = {
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    openedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DrinkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    barcode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    openedQuantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumPfandTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PfandType | EnumPfandTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPfandTypeFilter<$PrismaModel> | $Enums.PfandType
  }

  export type PfandCountOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    pfandType?: SortOrder
  }

  export type PfandAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type PfandMaxOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    pfandType?: SortOrder
  }

  export type PfandMinOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    pfandType?: SortOrder
  }

  export type PfandSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPfandTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PfandType | EnumPfandTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPfandTypeWithAggregatesFilter<$PrismaModel> | $Enums.PfandType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPfandTypeFilter<$PrismaModel>
    _max?: NestedEnumPfandTypeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DrinkCountOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrinkAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
  }

  export type DrinkMaxOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrinkMinOrderByAggregateInput = {
    id?: SortOrder
    barcode?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrinkSumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    openedQuantity?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPfandTypeFieldUpdateOperationsInput = {
    set?: $Enums.PfandType
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumPfandTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PfandType | EnumPfandTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPfandTypeFilter<$PrismaModel> | $Enums.PfandType
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPfandTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PfandType | EnumPfandTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PfandType[] | ListEnumPfandTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPfandTypeWithAggregatesFilter<$PrismaModel> | $Enums.PfandType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPfandTypeFilter<$PrismaModel>
    _max?: NestedEnumPfandTypeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}