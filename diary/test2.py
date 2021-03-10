def main():
    inp = input().replace(' ', '')
    if len(inp) >16:
        return print('error')

    dig = inp
    dig = dig.replace("9", "")
    dig = dig.replace("8", "")
    dig = dig.replace("7", "")
    dig = dig.replace("6", "")
    dig = dig.replace("5", "")
    dig = dig.replace("4", "")
    dig = dig.replace("3", "")
    dig = dig.replace("2", "")
    dig = dig.replace("1", "")
    dig = dig.replace("0", "")
    dig = dig.replace("-", "")
    dig = dig.replace("(", "")
    dig = dig.replace(")", "")
    if(dig != ''):
        return print('error')

    





    return print(inp)



if __name__ == "__main__":
    main()