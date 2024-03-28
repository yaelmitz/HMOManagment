import math


def perimeter(width , height):
    x = math.sqrt(int(height) ** 2 + int(width) ** 2)
    return x * 2 + int(width)


def func_print(width , height):
    width=int(width)
    height=int(height)
    odds = int(width / 2 - 1)
    add_lines = (height - 2) % odds
    lines = int((height - 2) / odds)
    x = 3
    space = int((width - 1) / 2)
    print(space * " " + "*")
    space -= 1
    for i in range(add_lines):
        print(space * " " + x * "*")
    for i in range(odds):
        for j in range(lines):
            print(space * " " + x * "*")
        x += 2
        space -= 1
    print(width * "*")


choice = " "
while True:
    print("please choose a shape of tower:")
    print("1 to rectangular tower")
    print("2 to triangle tower")
    print("3 to exit")
    num = input()
    if num == '1':
        choice = "rectangle"
    elif num == '2':
        choice = "triangle"
    else:
        print("program is done")
        quit()
    while True:
        height = int(input("Please enter thr height of the tower"))
        if height >= 2:
            break
    width = int(input("Please enter the width of the tower"))
    if choice == "rectangle":
        if abs(width - height) > 5:
            print("The area of the rectangle is: " + str(width * height))
        else:
            print("The perimeter of the rectangle is: " + str((width + height) * 2))
    else:
        print("Press 1 to calculate perimeter")
        print("Press 2 to print tower")
        choice = input()
        if (choice == '2'):
            if width % 2 == 0 or width > 2*height:
                print("sorry, The triangle cannot be printed")
            else:
                func_print(width,height)
        else:
                print("perimeter is :", perimeter(width, height))

